
import { supabaseClient } from "@/shared/api/supabase/client";

interface generateInquirNotiPayload {
    roomId: string
    userId: string;
    msgType: string;
    title: string;
    message: string;
}

export const generateInquirNoti = async (sendData: generateInquirNotiPayload) => {
    const supabase = supabaseClient()

    
    const { error: notiError } = await supabase
        .from("inquiry_notifications")
        .insert({
            room_id: sendData.roomId,
            user_id: sendData.userId,
            type: sendData.msgType,
            title: sendData.title,
            message: sendData.message,
            is_read: false,
        })

    if (notiError) {
        console.error("알림 생성 실패 api", notiError)
        throw notiError
    }
}