'use server'

import { StatsDataFromServer } from "@/entities/owner/model";
import { supabaseServer } from "@/shared/api/supabase/server";
import { ApiRes } from "@/shared/model";

export const getStatsData = async (shopId: string, selectedMonth: string): Promise<ApiRes<StatsDataFromServer>> => {
    try {

        const supabase = await supabaseServer()

        const { data, error } = await supabase.rpc('get_shop_stats', {
            target_shop_id: shopId,
            target_month: selectedMonth
        }).single()

        if (error || !data) {
            throw error
        }

        return { success: true, data: data as StatsDataFromServer }
    }
    catch (error) {
        console.error('통계 데이터 로드 실패', error)
        return { success: false, message:'전일 대비 데이터를 불러오지 못했습니다.'}
    }
}