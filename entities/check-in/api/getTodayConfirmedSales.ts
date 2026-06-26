'use server'
import { supabaseServer } from "@/shared/api/supabase/server"
import { startOfDay } from "date-fns"

export const getTodayConfirmedSales = async (shopId: string) => {
    try {
        const supabase = await supabaseServer()

        const todayStart = startOfDay(new Date()).toISOString()

        const { data, error } = await supabase.from('usage_logs').select('total_price')
            .eq('shop_id', shopId)
            .not('ended_at', 'is', null)
            .gte('ended_at', todayStart)
        if (error) {
            throw error
        }
        const res = data.reduce((acc, cur) => acc + (cur.total_price || 0), 0)

        return { success: true, data: res }
    } catch (error) {
        console.error('오늘 확정 매출 에러 api', error)
        return { success: false, message: '당일 매출 불러오기 실패' }
    }
}