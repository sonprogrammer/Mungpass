import { supabaseClient } from "@/shared/api/supabase/client"
import { endOfDay, parseISO, startOfDay } from "date-fns"

export const getExpectSales = async (shopId: string) => {
    const supabase = supabaseClient()
    
    const todayStart = startOfDay(new Date()).toISOString()
    const todayEnd = endOfDay(new Date()).toISOString()

    const { data, error } = await supabase.from('usage_logs')
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
    // console.log('data', data)/


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

        //TODO 코드 확인 해보기
        // * 상품 시간초과 && 유예 시간 초과 && 유예시간 명시 안한 상품일시
        // if (diffMs > 0 && diffMins > gracePeriodMins) {
        //     const chargeMins = diffMins - gracePeriodMins
        //     const overTimeUnits = Math.ceil(chargeMins / overtimeUnitMins)
        //     const extraCharge = overTimeUnits * overtimePrice

        //     return acc + price + extraCharge
        // } 
        if (diffMs > 0) {
            const chargeMins = Math.max(0, diffMins - gracePeriodMins)
            
            // 초과 단위 시간(overtimeUnitMins)이 0인 경우(설정 오류 방지)를 대비해 1로 나눗셈 방어
            const units = overtimeUnitMins > 0 ? Math.ceil(chargeMins / overtimeUnitMins) : 0
            const extraCharge = units * overtimePrice

            return acc + price + extraCharge
        }
        return acc + price
    }, 0)
    return totalSales
}