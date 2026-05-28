import { supabaseClient } from "@/shared/api/supabase/client"

export const readNotification = async(notiId: string) => {
    const supabase = supabaseClient()
    
    const {error} = await supabase.from('notifications').update({is_read: true}).eq('id', notiId)

    if(error){
        console.error('체크인아웃 읽음처리 에러 api', error)
        throw new Error('체크인 아웃 읽음 처리 에러')
    }
}