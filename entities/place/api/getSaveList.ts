'use server'

import { supabaseServer } from "@/shared/api/supabase/server"


export const getSaveList = async () => {
    try {
        const supabase = await supabaseServer()

        const { data: { user }, error: userError } = await supabase.auth.getUser()

        if (userError || !user) {
            throw new Error('로그인이 필요합니다.')
        }

        const { data, error } = await supabase
            .from('favorites')
            .select('*')
            .eq('user_id', user.id);

        if (error) {
            console.error('fetchSaveList Error', error);
            throw new Error('저장 목록을 불러오지 못했습니다.');
        }

        return {
            success: true,
            data: data ?? [],
        };
    } catch (error) {
        console.error('fetchSaveList server action error', error);

        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : '저장 목록을 불러오지 못했습니다.',
        };
    }
}