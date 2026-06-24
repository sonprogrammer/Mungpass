import { supabaseClient } from "@/shared/api/supabase/client";


export const deleteVacation = async(shopId: string)=> {
    const supabase = supabaseClient()
    
    const { error} = await supabase.from('shop_vacations').delete().eq('shop_id', shopId)

    if(error){
        console.error('삭제 오류', error)
        throw error
    }

    return true
}