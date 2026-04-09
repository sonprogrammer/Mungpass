import { supabaseClient } from "@/shared/api/supabase/client"
import { differenceInMinutes, endOfDay, startOfDay } from "date-fns"

export const getExpectSales = async (shopId: string) => {
    const todayStart = startOfDay(new Date()).toISOString()
    const todayEnd = endOfDay(new Date()).toISOString()
console.log('shopid from expect', shopId)
    const { data, error } = await supabaseClient.from('usage_logs')
        .select(`
            *,
            product: store_products(*)
            `)
        .eq('shop_id', shopId)
        .gte('started_at', todayStart)
        .lte('started_at', todayEnd)

    if (error) {
        console.error('get expect sales api error', error.message)
        throw error
    }

    if (data.length === 0) {
        return 0
    }

    console.log('data from getExpectSales:', data)

    const totalSales = data.reduce((acc, log) => {
        const product = Array.isArray(log.store_products) ? log.store_products[0] : log.store_products
        if(!product) return acc
        const price = product?.price || 0 // 가격
        const durationMins = product?.duration_minutes || 0 //상품의 기본 이용 시간(분)
        const overtimeUnitMins = product?.overtime_unit_mins || 0 //상품의 초과 단위 시간(분)
        const overtimePrice = product?.overtime_unit_price || 0 //상품의 초과 단위 가격
        const gracePeriodMins = product?.grace_period_mins || 0 //상품 유예 시간(분)

        
        // 기준 시간
        // ! 체크 해보기 이게 기본 이용 시간임(분) - 위에 durationMins랑 같은 값임
        const expectedEnd = new Date(log.expected_ended_at) 
        const realEndTime = log.ended_at ? new Date(log.ended_at) : new Date()

        // * 실제 이용시간이랑 상품 기본 시간이랑 차이 -> 초과이면 추가 요금을 위함임
        const diffMins = differenceInMinutes(realEndTime, expectedEnd)

        // * 유예 시간 안에 끝났을 때
        if (diffMins <= gracePeriodMins) {
            return acc + price
        } else {
            const overtimeUnits = Math.ceil(diffMins / overtimeUnitMins)
            return acc + price + (overtimeUnits * overtimePrice)
        }
    }, 0)
    return totalSales
}