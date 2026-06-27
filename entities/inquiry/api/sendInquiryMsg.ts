'use server'

import { SendInquiryMsgPayload } from "@/entities/inquiry/model";
import { supabaseServer } from "@/shared/api/supabase/server";
import { ApiRes } from "@/shared/model";

export const sendInquiryMsg = async (payload: SendInquiryMsgPayload): Promise<ApiRes<null>> => {
    try {

        const supabase = await supabaseServer()

        const { error } = await supabase.from('inquiry_messages').insert([{
            room_id: payload.roomId,
            sender_id: payload.senderId,
            sender_type: payload.senderType,
            message: payload.message
        }])
        if (error) {
            throw new Error('메시지 전송 실패')
        }

        const nextStatus = payload.senderType === 'admin' ? 'completed' : 'pending'

        const { error: roomUpdateError } = await supabase.from('inquiries_room').update({ status: nextStatus }).eq('id', payload.roomId)

        if (roomUpdateError) {
            throw new Error('채팅방 상태 업데이트 실패')
        }

        return { success: true, data: null }
    } catch (error) {
        return {
            success: false,
            message:
                error instanceof Error ? error.message : '메시지 전송 실패',
        };
    }
}