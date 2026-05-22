import { DailySalesData } from "@/entities/owner/model/types";
import { supabaseClient } from "@/shared/api/supabase/client";

export const getDailySalesForChart = async(shopId: string, start: string, end: string):Promise<DailySalesData[]> => {
    const supabase = supabaseClient()
    
    const { data, error} = await supabase.rpc('get_sales_data_by_period',{
        target_shop_id: shopId,
        start_date: start,
        end_date: end
    })

    if(error){
        console.error('일별 차트데이터 실패', error)
        throw error
    }

    return data 
}