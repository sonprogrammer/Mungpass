import { supabaseClient } from "@/shared/api/supabase/client"

export const readAllNotifications = async(id: string) => {
    const supabase = supabaseClient()
    
    const { error } = await supabase.from('notifications').update({is_read: true})
                                            .or(`user_id.eq.${id}, shop_id.eq.${id}`)
                                            .eq('is_read', false)

    if(error){
        console.error('체크인 아웃 전체 읽음 처리 실패 api', error)
        throw new Error('체크인 아웃 전체 읽음 처리 실패 api')
    }
}