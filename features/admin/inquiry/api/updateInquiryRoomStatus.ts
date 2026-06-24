import { supabaseClient } from "@/shared/api/supabase/client";

export const updateInquiryRoomStatus = async (roomId: string) => {
    const supabase = supabaseClient()

    const { error: roomError } = await supabase
        .from("inquiries_room")
        .update({
            status: "completed",
        })
        .eq("id", roomId)

    if (roomError) {
        console.error("방 상태 업데이트 실패", roomError)
        throw roomError
    }
}