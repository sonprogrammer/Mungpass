import { supabaseClient } from "@/shared/api/supabase/client"

interface ReadInquiryNotiByRoomPayload{
    roomId: string;
    type: 'inquiry_new_req' | 'inquiry_res'
}

export const readInquiryNotiByRoom = async({roomId, type}: ReadInquiryNotiByRoomPayload) => {
    const supabase = supabaseClient()

    const { error} = await supabase.from('inquiry_notifications').update({is_read: true}).eq('room_id', roomId).eq('type', type)

    if(error){
        console.error('채팅방 들어갈시 읽음 처리 실패 api', error)
        throw new Error('채팅방 들어갈시 읽음 처리 실패')
    }
}