import { StatsDataFromServer } from "@/entities/owner/model";
import { supabaseClient } from "@/shared/api/supabase/client";

export const getStatsData = async(shopId: string, selectedMonth: string):Promise<StatsDataFromServer> => {
    const supabase = supabaseClient()
    
    const {data , error} = await supabase.rpc('get_shop_stats', {
        target_shop_id: shopId,
        target_month: selectedMonth
    }).single()

    if(error){
        console.error('통계 데이터 로드 실패', error.message)
        throw new Error('통계 데이터 로드 실패', {cause: error})
    }

    return data as StatsDataFromServer
}