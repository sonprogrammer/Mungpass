import { supabaseClient } from "@/shared/api/supabase/client";

export const getInquiryMsg = async(roomId: string) => {
    const supabase = supabaseClient()

    const { data, error} = await supabase.from('inquiry_messages').select('*').eq('room_id', roomId).order("created_at", {ascending: true})

    if(error){
        console.error('문의 채팅방 가져오기 실패 api',error)
        throw new Error('문의 채팅방 가져오기 실패')
    }

    return data
}