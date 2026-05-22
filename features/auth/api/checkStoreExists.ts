import { CheckStoreExistsResult } from "@/features/auth/model/types";
import { supabaseClient } from "@/shared/api/supabase/client";


export const checkStoreExists = async (kakaoPlaceId: string, ownerId: string): Promise<CheckStoreExistsResult> => {
    const supabase = supabaseClient()

    try {
        // *이미 등록된가게인지 확인
        const { data: shopData, error: shopDataError } = await supabase
            .from('shops')
            .select('id')
            .eq('kakao_place_id', kakaoPlaceId)
            .maybeSingle()

        if (shopData) {
            return { exists: true, isPending: false, isRejectedByMe: false }
        }

        if (shopDataError) {
            console.error('shops테이블 가게 확인 api 에러 발생', shopDataError)
            throw shopDataError
        }

        // *store_registrations테이블에 이미 올라가 있는지 확인, pending, rejected면 여기 있음
        const { data: registrationData, error: registError } = await supabase.from('store_registrations')
            .select('status, owner_id, rejection_reason')
            .eq('kakao_place_id', kakaoPlaceId)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle()

        if (registError) {
            console.error('store_registrations 테이블 api 에러 발생', registError)
            throw registError
        }

        if (registrationData) {
            const { status, owner_id, rejection_reason } = registrationData

            if (status === 'PENDING') {
                return { exists: false, isPending: true, isRejectedByMe: false }
            }

            if (status === 'REJECTED') {
                //* 매장은 같고 반려당한게 당사자면 
                if (owner_id === ownerId) {
                    return { exists: false, isPending: false, isRejectedByMe: true, rejectReason: rejection_reason ||'반려 사유가 등록되지 않았습니다. 고객센터에 문의주세요'}
                // * 매장은 같은데 반려당한게 당사자가 아니라며
                } else {
                    return { exists: false, isPending: false, isRejectedByMe: false }
                }
            }
        }


        return { exists: false, isPending: false, isRejectedByMe: false }
    } catch (e) {
        console.error('예상치 못한 예외', e)
        return { exists: false, isPending: false, isRejectedByMe: false }
    }
}