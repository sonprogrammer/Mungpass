import { supabaseClient } from "@/shared/api/supabase/client"

export const readNotification = async(notiId: string) => {
    const {error} = await supabaseClient.from('notifications').update({is_read: true}).eq('id', notiId)

    return { error }
}