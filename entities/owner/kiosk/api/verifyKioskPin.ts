import { supabaseClient } from "@/shared/api/supabase/client";

export const verifyKioskPin = async(shopId: string, pin: string) => {
    console.log('shopid', shopId)
    
    const { data,error} = await supabaseClient.from('shops').select('kiosk_pin').eq('id', shopId).single()

    if(error){
        console.error('핀번호 가져오기 실패 api', error)
        throw new Error('핀번호 조회 실패')
    }

    return data.kiosk_pin === pin
}