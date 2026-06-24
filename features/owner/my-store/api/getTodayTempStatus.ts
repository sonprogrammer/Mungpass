import { supabaseClient } from "@/shared/api/supabase/client";
import { format } from "date-fns";

export const getTodayTempStatus = async(shopId: string) => {
    const supabase = supabaseClient()
    
    const today = new Date()
    const todayStr = format(today, 'yyyy-MM-dd')
    
    const { data, error} = await supabase.from('shop_temp_status').select('*')
                                        .eq('shop_id', shopId)
                                        .eq('target_date', todayStr)
                                        .maybeSingle()

    if(error){
        console.error('오늘 임시 휴무 데이터 가져오기 에러: ', error)
        throw error
    }

    return data
}