'use server'

import { supabaseServer } from "@/shared/api/supabase/server";
import { ApiRes } from "@/shared/model";


export const deleteVacation = async(shopId: string):Promise<ApiRes<null>>=> {
    try {
        
        const supabase = await supabaseServer()
        
        const { error} = await supabase.from('shop_vacations').delete().eq('shop_id', shopId)
        
        if(error){
            throw error
        }
        
        return {success: true, data: null}
    } catch (error) {
        console.error('삭제 오류', error)
        return {success: false, message: '휴가 삭제 실패'}
    }
}