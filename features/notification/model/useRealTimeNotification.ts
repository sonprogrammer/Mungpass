import { Notification } from "@/entities/notification/model/types";
import { useNotificationStore } from "@/features/notification/model/useNotificationStore";
import { supabaseClient } from "@/shared/api/supabase/client";
import { useEffect} from "react";

export function useRealTimeNotification() {
  const { setNotifications, addNotification } = useNotificationStore()

  useEffect(() => {

    const fetchNoti = async () => {
      const { data } = await supabaseClient.from('notifications').select('*').order('created_at', {ascending: false}).limit(20)
      if (data) setNotifications(data)
    }
    fetchNoti()

    const channel = supabaseClient
      .channel('schema-db-changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications' }, 
        (payload) => addNotification(payload.new as Notification)
      ).subscribe()

    return () => { supabaseClient.removeChannel(channel)}
  }, [addNotification, setNotifications])
}