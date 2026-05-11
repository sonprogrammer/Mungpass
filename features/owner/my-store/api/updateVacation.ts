import { UpdateVacationToServer } from "@/features/owner/my-store/model/types";
import { supabaseClient } from "@/shared/api/supabase/client";

export const updateVacation = async(vacationData:UpdateVacationToServer) => {
    const supabase = supabaseClient()
    
    const { data, error} = await supabase.from('shop_vacations').upsert([vacationData], { onConflict: 'shop_id' }).select().single()

    if(error){ 
        console.error('휴가 정보 보내기 오류 ', error)
        throw error
    }

    return data
}