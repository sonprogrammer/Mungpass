import { supabaseClient } from "@/shared/api/supabase/client";

export const updateKioskPin = async(shopId: string, newPin: string) => {
    const supabase = supabaseClient()
    
    const {error} = await supabase.from('shops').update({kiosk_pin: newPin}).eq('id', shopId)

    if(error){
        console.error('키오스크 비밀번호 업데이트 실패 api', error)
        throw error
    }

    return true
}