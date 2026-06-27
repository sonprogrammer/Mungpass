'use server'

import { supabaseServer } from "@/shared/api/supabase/server";
import { ApiRes } from "@/shared/model";

export async function deleteDog({ dogId }: { dogId: string }): Promise<ApiRes<null>> {
    try {

        const supabase = await supabaseServer()

        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (!user || userError) {
            throw new Error('로그인이 필요합니다.')
        }



        const { data, error } = await supabase.from('dogs').delete().eq('id', dogId).select()

        if (error) {
            console.error('강아지 삭제 에러', error);
            throw new Error('강아지 삭제에 실패했습니다.');
        }

        if (!data || data.length === 0) {
            throw new Error('삭제할 강아지를 찾을 수 없습니다.');
        }
        return { success: true, data: null }
    } catch (error) {
        console.error('deleteDog server action error', error);

        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : '강아지 삭제에 실패했습니다.',
        }
    }

}