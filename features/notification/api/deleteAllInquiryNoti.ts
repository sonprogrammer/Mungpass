import { supabaseClient } from "@/shared/api/supabase/client";

// TODO RoomId로 해서 삭제하기

export const deleteAllInquiryNoti = async(userId: string) => {
    const supabase = supabaseClient()

    const { error} = await supabase.from('inquiry_notifications').delete().eq('user_id', userId)

    if(error){
        console.error('1대1 문의 알림 전체 삭제 실패 api',error)
        throw new Error('1대1 문의 알림 전체 삭제 실패')
    }
}