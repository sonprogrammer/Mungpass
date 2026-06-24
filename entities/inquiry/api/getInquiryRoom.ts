
import { GetInquiryRoomParams, InquiryRoom } from "@/entities/inquiry/model";
import { supabaseClient } from "@/shared/api/supabase/client";



export const getInquiryRoom = async(userData: GetInquiryRoomParams): Promise<InquiryRoom[]> => {
    const supabase = supabaseClient()

    const { data, error} = await supabase.from('inquiries_room').select('*').eq('user_id', userData.userId).eq('user_type', userData.userType)
                                                                .order('updated_at', {ascending:false})

    if(error){
        console.error('문의 등록 정복 가져오기 실패 api', error)
        throw error
    }

    return data as InquiryRoom[]
}