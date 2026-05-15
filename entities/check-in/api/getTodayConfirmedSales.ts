import { supabaseClient } from "@/shared/api/supabase/client"
import { startOfDay } from "date-fns"

export const getTodayConfirmedSales = async(shopId: string) => {
    const supabase = supabaseClient()

    const todayStart = startOfDay(new Date()).toISOString()

    const { data ,error} = await supabase.from('usage_logs').select('total_price')
                                                            .eq('shop_id', shopId)
                                                            .not('ended_at', 'is', null)
                                                            .gte('ended_at', todayStart)
    if(error){
        console.error('오늘 확정 매출 에러 api', error)
        throw error
    }

    return data.reduce((acc, cur) => acc + (cur.total_price || 0), 0)
}