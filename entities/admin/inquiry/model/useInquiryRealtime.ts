'use client'


import { InquiryMessage } from "@/entities/inquiry/model";
import { supabaseClient } from "@/shared/api/supabase/client"
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react"


// ! 채팅용
export function useInquiryRealtime(roomId: string) {
    const queryClient = useQueryClient()

    useEffect(() => {
        if (!roomId) return
        const supabase = supabaseClient()

        const channel = supabase.channel(`room-${roomId}`).on('postgres_changes', {
            event: 'INSERT',
            schema: 'public',
            table: 'inquiry_messages',
            filter: `room_id=eq.${roomId}`
        }, (payload) => {
            const newMsg = payload.new as InquiryMessage
            queryClient.setQueryData(
                ['inquiryMessages', roomId],
                (old: InquiryMessage[] = []) => {
                    const exists = old.some((m) => m.id === newMsg.id)
                    if (exists) return old
                    return [...old, newMsg]
                }
            )
        }).subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [queryClient, roomId])

}

