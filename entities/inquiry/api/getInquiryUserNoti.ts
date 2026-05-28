import { supabaseClient } from "@/shared/api/supabase/client";

// ! 유저가 받는 알림
export const getInquiryUserNoti = async(userId: string) => {
    const supabase = supabaseClient()

    const {data, error} = await supabase.from('inquiry_notifications').select('*').eq('user_id', userId)
                                                                        .eq('type', 'inquiry_res')//관리자 답장인거

    if(error){
        console.error('일반유저, 사장유저의 알림 가져오기 실패 api', error)
        throw new Error('일반유저, 사장유저의 알림 가져오기 실패')
    }
    return data
}