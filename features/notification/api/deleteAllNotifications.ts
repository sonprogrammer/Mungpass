import { supabaseClient } from "@/shared/api/supabase/client";

export const deleteAllNotifications = async(targetId: string) => {
    const { error} = await supabaseClient.from('notifications').delete().or(`shop_id.eq.${targetId}, user_id.eq.${targetId}`)

    if(error){
        console.error('전체 알림 삭제 에러 Api', error)
        throw new Error('전체 알림 삭제중 오류 발생')
    }

    return true
}