import { supabaseClient } from "@/shared/api/supabase/client";

export const deleteTodayStatus = async(shopId: string) => {
    const supabase = supabaseClient()

    const {  error } = await supabase.from('shop_temp_status').delete().eq('shop_id', shopId)

    if(error){
        console.error('즉시 휴무, 조기마감 취소 실패', error)
        throw new Error('즉시 휴무, 조기마감 취소 실패', { cause: error})
    }

    return true
}