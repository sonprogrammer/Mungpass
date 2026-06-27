'use server'

import { supabaseServer } from "@/shared/api/supabase/server"
import { ApiRes, KakaoPlace } from "@/shared/model"


export const toggleSave = async (place: KakaoPlace): Promise<ApiRes<null>> => {
    try {
        const supabase = await supabaseServer()

        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError || !user) {
            throw new Error('로그인이 필요합니다.')
        }
        const { error: deleteError, count } = await supabase
            .from('favorites')
            .delete({ count: 'exact' })
            .eq('user_id', user.id)
            .eq('kakao_place_id', place.id);

        if (deleteError) {
            console.error('toggleSave delete error', deleteError);
            throw new Error('저장 처리에 실패했습니다.');
        }

        if (count === 0) {
            const { error: insertError } = await supabase
                .from('favorites')
                .insert({
                    user_id: user.id,
                    kakao_place_id: place.id,
                    shop_name: place.place_name,
                    category_name: place.category_name,
                    address: place.address_name,
                    place_url: place.place_url,
                    phone: place.phone,
                });

            if (insertError) {
                console.error('toggleSave insert error', insertError);
                throw new Error('저장 처리에 실패했습니다.');
            }
        }

        return {
            success: true,
            data: null,
        };
    } catch (error) {
        console.error('toggleSave server action error', error);

        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : '저장 처리에 실패했습니다.',
        };
    }
}