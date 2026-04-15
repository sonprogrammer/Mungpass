import { supabaseClient } from "@/shared/api/supabase/client"

export const readAllNotifications = async(id: string) => {
    
    const { error } = await supabaseClient.from('notifications').update({is_read: true})
                                            .or(`user_id.eq.${id}, shop_id.eq.${id}`)
                                            .eq('is_read', false)

    return { error }
}