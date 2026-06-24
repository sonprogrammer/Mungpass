import { supabaseClient } from "@/shared/api/supabase/client";

export const deleteIquiryNoti = async(notiId: string) => {
    const supabase = supabaseClient()

    const {error} = await supabase.from('inquiry_notifications').delete().eq('id', notiId)

    if(error){
        console.error('1대1 문의 알림 삭제 실패 api', error)
        throw error
    }
}