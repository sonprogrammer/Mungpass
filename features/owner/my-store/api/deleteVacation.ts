import { supabaseClient } from "@/shared/api/supabase/client";

export const deleteVacation = async(shopId: string)=> {
    const { error} = await supabaseClient.from('shop_vacations').delete().eq('shop_id', shopId)

    if(error){
        console.error('삭제 오류', error)
        throw error
    }

    return true
}