import { StatsDataFromServer } from '@/entities/owner/model/types'
import { supabaseClient } from "@/shared/api/supabase/client";

export const getStatsData = async(shopId: string, selectedMonth: string):Promise<StatsDataFromServer> => {
    const {data , error} = await supabaseClient.rpc('get_shop_stats', {
        target_shop_id: shopId,
        target_month: selectedMonth
    }).single()

    console.log('data from getstats data', data)
    if(error){
        console.error('통계 데이터 로드 실패', error.message)
        throw error
    }

    return data as StatsDataFromServer
}