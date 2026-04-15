import { supabaseClient } from "@/shared/api/supabase/client"
import { endOfDay, parseISO, startOfDay } from "date-fns"

export const getExpectSales = async (shopId: string) => {
    const todayStart = startOfDay(new Date()).toISOString()
    const todayEnd = endOfDay(new Date()).toISOString()

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


    const totalSales = data.reduce((acc, log) => {
        // * 퇴실 완료된 데이터
        if(log.ended_at){
            return acc + (log.total_price || 0)
        }
        // * 아직 이용중
        const product = log.product
        if(!product) return acc
        const price = product.price || 0 // 가격
        const overtimeUnitMins = product.overtime_unit_mins || 0 //상품의 초과 단위 시간(분)
        const overtimePrice = product.overtime_unit_price || 0 //상품의 초과 단위 가격
        const gracePeriodMins = product.grace_period_mins || 0 //상품 유예 시간(분)

        
        const now =new Date()
        
        //* 끝나야하는 시간(=상품시간)
        const expectedEnd = parseISO(log.expected_ended_at) 

        // *초과 시간 
        const diffMs = now.getTime() - expectedEnd.getTime()
        const diffMins = Math.floor(diffMs / 60000)

        
        // * 유예 시간 
        if (diffMs > 0 && diffMins > gracePeriodMins) {
            const chargeMins = diffMins - gracePeriodMins
            const overTimeUnits = Math.ceil(chargeMins / overtimeUnitMins)
            const extraCharge = overTimeUnits * overtimePrice

            return acc + price + extraCharge
        } 
        return acc + price
    }, 0)
    return totalSales
}