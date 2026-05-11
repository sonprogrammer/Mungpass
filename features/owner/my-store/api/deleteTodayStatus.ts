import { supabaseClient } from "@/shared/api/supabase/client";
import { format } from "date-fns";

export const deleteTodayStatus = async(shopId: string) => {
    const supabase = supabaseClient()
    
    const today = new Date()
    const todayStr = format(today,'yyyy-MM-dd')

    const { error } = await supabase.from('shop_temp_status').delete().eq('shop_id', shopId)
                                            .eq('target_date', todayStr)

    if(error){
        console.error('즉시 휴무, 조기마감 취소 실패', error)
        throw error
    }

    return true
}