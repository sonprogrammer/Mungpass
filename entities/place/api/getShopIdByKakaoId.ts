'use server'

import { supabaseServer } from "@/shared/api/supabase/server";
import { ApiRes } from "@/shared/model";

export const getShopIdByKakaoId = async (kakaoId: string): Promise<ApiRes<{ id: string } | null>>=> {
    try {

        const supabase = await supabaseServer()

        const { data, error } = await supabase.from('shops').select('id').eq('kakao_place_id', kakaoId).maybeSingle()

        if (error) {
            console.error('카카오id로 매장 조회 에러 api', error)
            throw new Error('매장 정보를 불러오지 못했습니다.')
        }

        return { success: true, data: data ?? null}
    } catch (error) {
        console.error('카카오id로 매장 조회 에러 api', error)
        return { success: false, message: error instanceof Error ? error.message : '매장 정보를 불러오지 못했습니다'}
    }
}