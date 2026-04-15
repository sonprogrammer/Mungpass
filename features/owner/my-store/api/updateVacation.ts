import { UpdateVacationToServer } from "@/features/owner/my-store/model/types";
import { supabaseClient } from "@/shared/api/supabase/client";

console.log('API 파일 로드됨')

export const updateVacation = async(vacationData:UpdateVacationToServer) => {
    const { data, error} = await supabaseClient.from('shop_vacations').upsert([vacationData], { onConflict: 'shop_id' }).select().single()

    if(error){ 
        console.error('휴가 정보 보내기 오류 ', error)
        throw error
    }

    return data
}