import { SendInquiryMsgPayload } from "@/entities/inquiry/model/types";
import { supabaseClient } from "@/shared/api/supabase/client";

export const sendInquiryMsg = async(payload:SendInquiryMsgPayload):Promise<void> => {
    const supabase = supabaseClient()

    const { error} = await supabase.from('inquiry_messages').insert([{
                                                                room_id:payload.roomId,
                                                                sender_id: payload.senderId,
                                                                sender_type: payload.senderType,
                                                                message: payload.message
                                                            }])
    if(error){
        console.error('메시지 보내기 에러 api', error)
        throw new Error('메시지 전송에 실패하였습니다')
    }

    const nextStatus = payload.senderType === 'admin' ? 'completed' : 'pending'

    const { error: roomUpdateError} = await supabase.from('inquiries_room').update({status: nextStatus}).eq('id', payload.roomId)

    if(roomUpdateError){
        console.error('채팅방 상태 업데이트 실패 api', roomUpdateError)
        throw new Error('채팅방 상태 업데이트 실패')
    }


}