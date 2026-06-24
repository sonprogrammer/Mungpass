import { supabaseClient } from "@/shared/api/supabase/client";

export const deleteNotification = async(notiId: string) => {
    const supabase = supabaseClient()
    const { error} = await supabase.from('notifications').delete().eq('id', notiId)
    
    if(error){
        console.error('알림 삭제 에러 api', error)
        throw error
    }
    return true
}