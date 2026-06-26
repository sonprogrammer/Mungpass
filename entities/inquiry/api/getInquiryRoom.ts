'use server'
import { ApiRes } from '@/shared/model';

import { GetInquiryRoomParams, InquiryRoom } from "@/entities/inquiry/model";
import { supabaseServer } from "@/shared/api/supabase/server";



export const getInquiryRoom = async (userData: GetInquiryRoomParams): Promise<ApiRes<InquiryRoom[]>> => {
    try {

        const supabase = await supabaseServer()

        const { data: { user }, error: userError } = await supabase.auth.getUser()

        if (!user || userError) {
            return { success: false, message: '인증되지 않은 사용자입니다'}
        }

        const { data, error } = await supabase.from('inquiries_room').select('*').eq('user_id', userData.userId).eq('user_type', userData.userType)
            .order('updated_at', { ascending: false })

        if (error) {
            throw error
        }

        return {success: true, data: data as InquiryRoom[]}
    } catch (error) {
        console.error('문의 등록 정복 가져오기 실패 api', error)
        return { success: false, message: '문의 정qh 가져오기 실패' }
    }
}