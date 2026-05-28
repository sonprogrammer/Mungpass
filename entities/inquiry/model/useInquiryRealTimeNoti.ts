'use client'

import { InquiryNoti } from "@/entities/inquiry/model/types";
import { useInquiryNotiStore } from "@/entities/inquiry/model/useInquiryNotiStore";
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


        const channelName = isAdmin ? `inquiry-admin-noti` : `inqury-user-${userId}`

        const matchFilter = isAdmin ? undefined : `user_id=eq.${userId}`

        const channel = supabase.channel(channelName).on('postgres_changes', {
            event: 'INSERT',
            schema: 'public',
            table: 'inquiry_notifications',
            filter: matchFilter
        }, () => {
            if (isAdmin) {
                queryClient.invalidateQueries({
                    queryKey: ['inquiry-noti-admin']
                })
            } else {
                queryClient.invalidateQueries({
                    queryKey: ['inquiry-noti', userId]
                })
            }
        })
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [userId, isAdmin, queryClient])
}