import { supabaseClient } from "@/shared/api/supabase/client";

export const getShopIdByKakaoId = async(kakaoId: string) => {

    const supabase = supabaseClient()
    
    const { data, error} = await supabase.from('shops').select('id').eq('kakao_place_id', kakaoId).maybeSingle()

    if(error){
        console.error('카카오id로 매장 조회 에러 api', error)
        throw new Error('매장 정보를 가져오는데 실패했습니다')
    }

    return data || null
}