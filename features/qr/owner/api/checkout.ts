import { supabaseClient } from "@/shared/api/supabase/client";
import { addMinutes, differenceInMinutes, isAfter, parseISO } from "date-fns";

export const checkout = async (usageId: string) => {
    const supabase = supabaseClient()
    const now = new Date()


    //* 해당 이용id에 대한 이용 내역 가져오기 
    const { data: usage, error } = await supabase.from('usage_logs')
        .select(`*,
                                            dog: dogs(*),
                                            product: store_products(*)
                                            `)
        .eq('id', usageId)
        .single()

    if (error) {
        console.error('이용 내역 가져오기 api error from checkout file', error)
        throw new Error('가게 이용 기록 가져오기 실패')
    }


    const { product } = usage

    const expectedEnd = parseISO(usage.expected_ended_at)

    // * 유예시간 
    const gracePeriodMins = product.grace_period_mins ?? 0
    const graceEnd = addMinutes(expectedEnd, gracePeriodMins)

    let extraCharge = 0
    let overTimeMins = 0

    // * 추가요금
    if (isAfter(now, graceEnd)) {
        overTimeMins = differenceInMinutes(now, expectedEnd)
        // const diffMins = differenceInMinutes(now, expectedEnd)

        const unitMins = product.overtime_unit_mins ?? 0
        const unitPrice = product.overtime_unit_price ?? 0

        const chargeMins = Math.max(0, overTimeMins - gracePeriodMins)

        if (unitMins > 0) {
            const extraUnits = Math.ceil(chargeMins / unitMins)
            extraCharge = extraUnits * unitPrice
        }

    }

    const totalPrice = (product.price || 0) + extraCharge

    // * 체크아웃
    const { data: updateDate, error: updateError } = await supabase.from('usage_logs')
        .update({
            ended_at: now.toISOString(),
            status: 'completed',
            extra_charge: extraCharge,
            total_price: totalPrice
        })
        .eq('id', usageId)
        .select()
        .single()
    if (updateError) {
        console.error('체크 아웃 상태 변경 api error from checkout file', updateError)
        throw new Error('체크 아웃 실패, 다시 시도 해주세요')
    }


    return {
        success: true,
        data: updateDate,
        extraCharge,
        overTimeMins: isAfter(now, expectedEnd) ? differenceInMinutes(now, expectedEnd) : 0
    }
}