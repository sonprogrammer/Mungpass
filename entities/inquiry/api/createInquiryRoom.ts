'use server'

import { CreatedInquiryRoomParams, InquiryRoom } from "@/entities/inquiry/model";
import { supabaseServer } from "@/shared/api/supabase/server";
import { ApiRes } from "@/shared/model";

export const createInquiryRoom = async (roomData: CreatedInquiryRoomParams): Promise<ApiRes<InquiryRoom>> => {
    try {
        const supabase = await supabaseServer()

        const { data, error } = await supabase.from('inquiries_room').insert([{
            user_id: roomData.userId,
            user_type: roomData.userType,
            category: roomData.category,
            title: roomData.title,
            status: 'pending'
        }])
            .select()
            .single()

        if (error) {
            throw error
        }


        const { error: msgError } = await supabase.from('inquiry_messages').insert([{
            room_id: data.id,
            sender_id: roomData.userId,
            sender_type: roomData.userType,
            message: roomData.firstMsg
        }])
        if (msgError) {
            console.error('메시지 전송 실패 api', msgError)
            throw msgError
        }

        return { success: true, data: data as InquiryRoom }
    } catch (error) {
        console.error('inquiry room 생성 실패 api', error)
        return { success: false, message: '생성 실패' }
    }
}