import { supabaseClient } from "@/shared/api/supabase/client";

export const checkStoreExists = async(kakaoPlaceId: string) => {
    const { data, error} = await supabaseClient.from('shops').select('id').eq('kakao_place_id', kakaoPlaceId).maybeSingle()

    if(error){
        console.error('매장 중복 체크 에러 api', error)
        throw new Error('매장 중복 체크 에러')
    }
    return !!data
}