import { Notification } from "@/entities/notification/model/types";
import { useNotificationStore } from "@/features/notification/model/useNotificationStore";
import { supabaseClient } from "@/shared/api/supabase/client";
import { useEffect} from "react";



export function useRealTimeNotification({userId, shopId}: useRealTimeNotificationProps) {
  const supabase = supabaseClient()
  const { setNotifications, addNotification, removeNotification } = useNotificationStore()
  
  useEffect(() => {
    if(!userId && !shopId) return

    const fetchNoti = async () => {
      let query = supabase.from('notifications').select('*')
      // * 가게 알림용
      if(shopId){
        query = query.eq('shop_id', shopId).like('type', 'shop_%')

      }else if(userId){ //* 손님 알림용
        query = query.eq('user_id', userId).not('type', 'like', 'shop_%')
      }
      const { data } = await query.order('created_at', {ascending: false}).limit(20)
      if (data) setNotifications(data)
    }
    fetchNoti()

    const filter = shopId ? `shop_id=eq.${shopId}` : `user_id=eq.${userId}`
    const channelName = shopId ? `shop-${shopId}` : `user-${userId}`


    const channel = supabase
      .channel(channelName)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications', filter: filter }, 
        (payload) => {
          const newNoti = payload.new as Notification

          if(shopId){
            if(newNoti.type.startsWith('shop_')){
              addNotification(newNoti)
            }
            return
          }
          if(userId){
            if(!newNoti.type.startsWith('shop_')){
              addNotification(newNoti)
            }
            return
          }
          
        }
      )
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'notifications', filter: filter},
        (payload) => {
          if(payload.old && payload.old.id){
            removeNotification(payload.old.id)
          }
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel)}
  }, [userId, shopId, addNotification, setNotifications, removeNotification, supabase])
}