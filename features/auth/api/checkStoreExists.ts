import { supabaseClient } from "@/shared/api/supabase/client";

// export const checkStoreExists = async(kakaoPlaceId: string) => {
//     console.log('kakaoplaceid', kakaoPlaceId)
//     const { data, error} = await supabaseClient.from('shops').select('id').eq('kakao_place_id', kakaoPlaceId).maybeSingle()

//     if(error){
//         console.error('매장 중복 체크 에러 api', error)
//         throw new Error('매장 중복 체크 에러')
//     }
//     console.log('data', data)
//     return !!data
// }
export const checkStoreExists = async(kakaoPlaceId: string) => {
    console.log('1. API 시작 - ID:', kakaoPlaceId); 

    try {
        // 꼼수: 정말 supabase 문제인지 확인하기 위해 5초 타임아웃 설정
        const promise = supabaseClient
            .from('shops')
            .select('id')
            .eq('kakao_place_id', kakaoPlaceId)
            .maybeSingle();

        console.log('2. Supabase 요청 직전');
        const { data, error } = await promise;
        
        console.log('3. Supabase 응답 도착:', data);

        if(error) {
            console.error('4. 에러 발생:', error);
            throw error;
        }

        return !!data;
    } catch (e) {
        console.error('5. 예상치 못한 예외:', e);
        return false;
    }
}