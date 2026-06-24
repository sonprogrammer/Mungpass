import { supabaseClient } from "@/shared/api/supabase/client";

export const verifyKioskPin = async(shopId: string, pin: string) => {
    const supabase = supabaseClient()
    
    const { data,error} = await supabase.from('shops').select('kiosk_pin').eq('id', shopId).single()

    if(error){
        console.error('핀번호 가져오기 실패 api', error)
        throw error
    }

    return data.kiosk_pin === pin
}