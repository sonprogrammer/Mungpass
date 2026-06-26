'use server'

import { supabaseServer } from "@/shared/api/supabase/server";
import { ApiRes } from "@/shared/model";

export const deleteTodayStatus = async(shopId: string): Promise<ApiRes<null>> => {
    try {
        
        const supabase = await supabaseServer()
        
        const {  error } = await supabase.from('shop_temp_status').delete().eq('shop_id', shopId)
        
        if(error){
            throw error
        }
        
        return {success: true, data: null} //성공이냐 마냐 니깐 null넣어도 사오낙ㅁ없음 
    } catch (error) {
        console.error('즉시 휴무, 조기마감 취소 실패', error)
        return { success: false, message: '휴무/조기 마감 취소 실패'}
    }
}