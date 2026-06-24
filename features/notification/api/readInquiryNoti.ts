import { supabaseClient } from "@/shared/api/supabase/client";

export const readInquiryNoti = async(notiId: string) => {
    const supabase = supabaseClient()
    const { error} = await supabase.from('inquiry_notifications').update({is_read: true}).eq('id', notiId)

    if(error){
        console.error('1대1 읽음처리 에러 api', error)
        throw error
    }

}