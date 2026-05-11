import { supabaseClient } from "@/shared/api/supabase/client";


export const checkStoreExists = async(kakaoPlaceId: string) => {
    const supabase = supabaseClient()
    console.log('1. API 시작 - ID:', kakaoPlaceId); 
    
    try {
        const promise = supabase
            .from('shops')
            .select('id')
            .eq('kakao_place_id', kakaoPlaceId)
            .limit(1)

        console.log('2. Supabase 요청 직전')
        const { data, error } = await promise
        
        console.log('3. Supabase 응답 도착:', data)

        if(error) {
            console.error('4. 에러 발생:', error)
            throw error
        }

        return data && data.length > 0
    } catch (e) {
        console.error('5. 예상치 못한 예외:', e)
        return false
    }
}