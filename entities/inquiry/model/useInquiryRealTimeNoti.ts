'use client'


import { supabaseClient } from "@/shared/api/supabase/client"
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react"


interface useInquiryRealTimeNotiProps {
    userId: string; // 일반 유저, 사장유저
    isAdmin?: boolean
}

// ! 알림용

export function useInquiryRealTimeNoti({ userId, isAdmin = false }: useInquiryRealTimeNotiProps) {
    const supabase = supabaseClient()
    const queryClient = useQueryClient()

    useEffect(() => {
        if (!userId && !isAdmin) return
        // TODO 채널명 룸아이디로 바꾸기


        const channelName = isAdmin ? 'inquiry-admin-noti' : `inquiry-user-${userId}`

        const config = isAdmin ? {
            event: 'INSERT' as const,
            schema: 'public',
            table: 'inquiry_notifications',
        }
            : {
                event: 'INSERT' as const,
                schema: 'public',
                table: 'inquiry_notifications',
                filter: `user_id=eq.${userId}`,
            }

        const channel = supabase
            .channel(channelName)
            .on(
                'postgres_changes',
                config,
                () => {
                    if (isAdmin) {
                        queryClient.invalidateQueries({
                            queryKey: ['inquiry-noti-admin'],
                        })
                    } else {
                        queryClient.invalidateQueries({
                            queryKey: ['inquiry-user-noti', userId],
                        })
                    }
                }
            )
            .subscribe((status, error) => {
                console.log('🔥 inquiry realtime:', status, error)
            })


        return () => {
            supabase.removeChannel(channel)
        }
    }, [userId, isAdmin, queryClient, supabase])
}