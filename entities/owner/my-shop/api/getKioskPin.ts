import { supabaseClient } from "@/shared/api/supabase/client";

export const getKioskPin = async(shopId: string) => {
    const supabase = supabaseClient()
    
    const {data, error} = await supabase.from('shops').select('kiosk_pin')
                                                .eq('id', shopId)
                                                .single()
    if(error){
        console.error('kiosk pin번호 가져온는 api error', error)
        throw new Error('키오스크 핀번호를 가져오지 못했습니다.')
    }

    return data.kiosk_pin
}