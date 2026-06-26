'use server'

import { supabaseServer } from "@/shared/api/supabase/server";

// ! 유저가 받는 알림
export const getInquiryUserNoti = async(userId: string) => {
    try {
        
        const supabase = await supabaseServer()
        
        const {data, error} = await supabase.from('inquiry_notifications').select('*').eq('user_id', userId)
        .eq('type', 'inquiry_res')//관리자 답장인지 확인
        
        if(error){
            throw error
        }
        return {success: true, data}
    } catch (error) {
        console.error('일반유저, 사장유저의 알림 가져오기 실패 api', error)
        return { success: false, message: '알림 불러오기 실패'}
    }
}