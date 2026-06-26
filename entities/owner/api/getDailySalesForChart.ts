'use server'

import { ApiRes } from '@/shared/model';
import { DailySalesData } from "@/entities/owner/model";
import { supabaseServer } from "@/shared/api/supabase/server";

export const getDailySalesForChart = async (shopId: string, start: string, end: string): Promise<ApiRes<DailySalesData[]>> => {
    try {

        const supabase = await supabaseServer()

        const { data, error } = await supabase.rpc('get_sales_data_by_period', {
            target_shop_id: shopId,
            start_date: start,
            end_date: end
        })

        if (error) {
            throw error
        }

        return {success: true, data: data}
    } catch (error) {
        console.error('일별 차트데이터 실패', error)
        return { success: false, message: '일별 차트 데이터를 불러오지 못했습니다.'}
    }
}