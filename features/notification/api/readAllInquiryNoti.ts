import { supabaseClient } from "@/shared/api/supabase/client";

// TODO 보고 roomid로 해서 전체 읽음 처리하기 
export const readAllInquiryNoti = async(userId: string) => {
    const supabase = supabaseClient()
    const { error} = await supabase.from('inquiry_notifications').update({is_read: true}).eq('userId', userId).eq('is_read', false)

    if(error){
        console.error('1대1 문의 전체 읽음 처리 실패 api', error)
        throw error
    }
}