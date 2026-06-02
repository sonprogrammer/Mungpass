
import { CreatedInquiryRoomParams, InquiryRoom } from "@/entities/inquiry/model";
import { supabaseClient } from "@/shared/api/supabase/client";

export const createInquiryRoom = async(roomData: CreatedInquiryRoomParams):Promise<InquiryRoom> =>{
    const supabase = supabaseClient()

    const { data , error} = await supabase.from('inquiries_room').insert([{
                                                                    user_id: roomData.userId,
                                                                    user_type: roomData.userType,
                                                                    category: roomData.category,
                                                                    title: roomData.title,
                                                                    status: 'pending'
                                                                }])
                                                                .select()
                                                                .single()
    
    if(error){
        console.error('inquiry room 생성 실패 api', error)
        throw error
    }


    const { error: msgError} = await supabase.from('inquiry_messages').insert([{
                                                                        room_id: data.id,
                                                                        sender_id: roomData.userId,
                                                                        sender_type: roomData.userType,
                                                                        message: roomData.firstMsg
                                                                    }])
    if(msgError){
        console.error('메시지 전송 실패 api', msgError)
        throw new Error('첫 문의 메시지 등록 실패')
    }

    return data as InquiryRoom
}