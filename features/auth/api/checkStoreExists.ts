import { CheckStoreExistsResult } from "@/features/auth/model";
import { supabaseClient } from "@/shared/api/supabase/client";


export const checkStoreExists = async (kakaoPlaceId: string, ownerId: string): Promise<CheckStoreExistsResult> => {
    const supabase = supabaseClient()

    let hasError = false
    try {
        // *이미 등록된가게인지 확인
        const { data: shopData, error: shopDataError } = await supabase
            .from('shops')
            .select('id')
            .eq('kakao_place_id', kakaoPlaceId)
            .maybeSingle()

        if (shopData) {
            return { exists: true, isPending: false, isRejectedByMe: false, error: false }
        }

        if (shopDataError) {
            console.error('shops테이블 가게 확인 api 에러 발생', shopDataError)
            throw shopDataError
        }
    } catch (error) {
        console.error('shops 테이블 조회 에러 발생 api', error)
        hasError = true
    }


    try {
        // *store_registrations테이블에 이미 올라가 있는지 확인, pending, rejected면 여기 있음
        const { data: statusData, error: statusError } = await supabase.from('registration_status_view')
            .select('status')
            .eq('kakao_place_id', kakaoPlaceId)
            .limit(1)
            .maybeSingle()

        if (statusError) {
            console.error('store_registrations 테이블 api 에러 발생', statusError)
            throw statusError
        }

        if (statusData?.status === 'PENDING') {
            return { exists: false, isPending: true, isRejectedByMe: false, error: false }
        }

        if (statusData?.status === 'REJECTED') {
            const { data: rejectData, error: rejectError } = await supabase.from('store_registrations').select('rejection_reason')
                .eq('kakao_place_id', kakaoPlaceId)
                .eq('owner_id', ownerId)
                .maybeSingle()
            if(rejectError)
                console.error('store_registrations 테이블 거절 사유 api 에러 발생', rejectError)
                throw rejectError
            
            if(rejectData){
                return {exists: false, isPending: false, isRejectedByMe: true, rejectReason: rejectData.rejection_reason || '반려 사유가 없습니다.', error: false}
            }
        }

    } catch (error) {
        console.error('registrations 조회 에러', error)
        hasError = true
    }

    if (hasError) {
        return { exists: false, isPending: false, isRejectedByMe: false, error: true }
    }

    return { exists: false, isPending: false, isRejectedByMe: false, error: false };

}