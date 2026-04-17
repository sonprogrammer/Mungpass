import { supabaseClient } from "@/shared/api/supabase/client";

export const deleteNotification = async(notiId: string) => {
    const { error} = await supabaseClient.from('notifications').delete().eq('id', notiId)
    
    if(error){
        console.error('알림 삭제 에러 api', error)
        throw new Error('알림 삭제 에러발생')
    }
    return true
}