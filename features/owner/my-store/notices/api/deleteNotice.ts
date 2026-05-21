import { supabaseClient } from "@/shared/api/supabase/client";

export const deleteNotice = async(noticeId: string) => {
    const supabase = supabaseClient()

    const { error } = await supabase.from('shop_notices').delete().eq('id', noticeId)

    if(error){
        console.error('공지사항 삭제 에러 api', error)
        throw error
    }

    return true
}