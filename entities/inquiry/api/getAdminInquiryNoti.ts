import { supabaseClient } from "@/shared/api/supabase/client";

export const getAdminInquiryNoti = async() => {
    const supabase = supabaseClient()

    const { data, error} = await supabase.from('inquiry_notifications').select('*').eq('type', 'inquiry_new_req')
                                                                        .eq('is_read', false)
                                                                        .order('created_at', {ascending:false})
    if(error){
        console.error('관리자 문의 알림 조회 실패 api', error)
        throw new Error('관리자 문의 알림 조회 실패')
    }

    return data
}