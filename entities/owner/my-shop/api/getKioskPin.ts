import { supabaseClient } from "@/shared/api/supabase/client";

export const getKioskPin = async(shopId: string) => {
    const supabase = supabaseClient()
    
    const {data, error} = await supabase.from('shops').select('kiosk_pin')
                                                .eq('id', shopId)
                                                .single()
    if(error){
        console.error('kiosk pin번호 가져온는 api error', error)
        throw error
    }

    return data.kiosk_pin
}