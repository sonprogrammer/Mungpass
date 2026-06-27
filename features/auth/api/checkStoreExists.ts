'use server'

import { CheckStoreExistsResult } from "@/features/auth/model";
import { supabaseServer } from "@/shared/api/supabase/server";
import { ApiRes } from "@/shared/model";


export const checkStoreExists = async (kakaoPlaceId: string, ownerId: string): Promise<ApiRes<CheckStoreExistsResult>> => {
    try {
        const supabase = await supabaseServer()

        // *이미 등록된가게인지 확인
        const { data: shopData, error: shopDataError } = await supabase
            .from('shops')
            .select('id')
            .eq('kakao_place_id', kakaoPlaceId)
            .maybeSingle()

        if (shopData) {
            return { success: true, data: { exists: true, isPending: false, isRejectedByMe: false, error: false } }
        }

        if (shopDataError) {
            throw shopDataError
        }




        // *store_registrations테이블에 이미 올라가 있는지 확인, pending, rejected면 여기 있음
        const { data: statusData, error: statusError } = await supabase.from('registration_status_view')
            .select('status')
            .eq('kakao_place_id', kakaoPlaceId)
            .limit(1)
            .maybeSingle()

        if (statusError) {
            throw statusError
        }



        if (statusData?.status === 'PENDING') {
            return { success: true, data: { exists: false, isPending: true, isRejectedByMe: false, error: false } }
        }

        if (statusData?.status === 'REJECTED') {
            const { data: rejectData, error: rejectError } = await supabase.from('store_registrations').select('rejection_reason')
                .eq('kakao_place_id', kakaoPlaceId)
                .eq('owner_id', ownerId)
                .maybeSingle()
            if (rejectError) {
                throw rejectError
            }

            return { success: true, data: { exists: false, isPending: false, isRejectedByMe: true, rejectReason: rejectData?.rejection_reason || '반려 사유가 없습니다.', error: false } }
        }

        return {
            success: true,
            data: {
                exists: false,
                isPending: false,
                isRejectedByMe: false,
                error: false,
            },
        };
    } catch (error) {
        console.error('registrations 조회 에러', error)
        console.error('checkStoreExists error', error);

        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : '가게 존재 여부 확인 실패',
        }
    }

}