import { supabaseClient } from "@/shared/api/supabase/client";

export const updateKioskPin = async(shopId: string, newPin: string) => {
    const {error} = await supabaseClient.from('shops').update({kiosk_pin: newPin}).eq('id', shopId)

    if(error){
        console.error('키오스크 비밀번호 업데이트 실패 api', error)
        throw new Error('키오스크 핀번호 업데이트 실패했습니다.')
    }

    return true
}