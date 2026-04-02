import { supabaseClient } from "@/shared/api/supabase/client";
import { format } from "date-fns";

export const deleteVacation = async(shopId: string)=> {
    const today = format(new Date(), 'yyyy-MM-dd')
    const { error} = await supabaseClient.from('shop_vacations').delete().eq('shop_id', shopId)
                                            .gte('end_date', today)

    if(error){
        console.error('삭제 오류', error)
        throw error
    }

    return true
}