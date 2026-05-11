import { MonthlySalesData } from "@/entities/owner/model/types";
import { supabaseClient } from "@/shared/api/supabase/client";

export const getMonthlySalesData = async(shopId: string):Promise<MonthlySalesData[]> => {
    const supabase = supabaseClient()
    
    const { data, error} = await supabase.rpc('get_monthly_total_sales', {
        target_shop_id: shopId
    })

    if(error){
        console.error('연별 데이터를 가져오지 못했습니다', error)
        throw error
    }

    return data as MonthlySalesData[]
}