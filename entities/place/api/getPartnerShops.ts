import { supabaseClient } from "@/shared/api/supabase/client";

export const getPartnerShops = async (kakaoId: string[]) => {
    const supabase = supabaseClient()

    const { data, error } = await supabase.from('shops').select('id, kakao_place_id')
                                            .in('kakao_place_id',kakaoId)

    if(error){
        console.error('멍패스 제휴매장 찾기 실패 api', error)
        throw new Error('멍패스 제휴매장 찾기 실패 api', { cause: error})
    }

    return data
}