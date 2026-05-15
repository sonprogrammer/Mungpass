import { supabaseClient } from "@/shared/api/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export function useRealTimeUsage(shopId: string | undefined) {
    const queryClient = useQueryClient()

    useEffect(() => {
        if(!shopId) return

        const supabase = supabaseClient()

        const channel = supabase.channel(`realtime-shop-${shopId}`)
                                .on('postgres_changes',
                                    {
                                        event: '*',
                                        schema: 'public',
                                        table: 'usage_logs',
                                        filter: `shop_id=eq.${shopId}`
                                    },
                                    (payload) => {
                                        queryClient.invalidateQueries({queryKey: ['todayVisitCount', shopId]})
                                        queryClient.invalidateQueries({queryKey: ['currentLogs', shopId, 'staying']})
                                        queryClient.invalidateQueries({queryKey: ['avgUsingTime', shopId]})
                                        queryClient.invalidateQueries({queryKey: ['expectedSales', shopId]})
                                        queryClient.invalidateQueries({queryKey: ['today-confirmed-sales', shopId]})
                                    }
                                ).subscribe()
    return () => {
        supabase.removeChannel(channel)
    }
    },[shopId, queryClient])
}
