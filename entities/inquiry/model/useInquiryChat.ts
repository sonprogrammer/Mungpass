import { InquiryMessage } from './types';
import { supabaseClient } from "@/shared/api/supabase/client";
import { App } from 'antd';
import { useEffect, useState } from "react";

export function useInquiryChat(roomId: string) {
    const [messages, setMessages] = useState<InquiryMessage[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const {message} = App.useApp()

    const supabase = supabaseClient()

    useEffect(() => {
        async function fetchMsgs() {
            try {
                setIsLoading(true)
                const { data, error} = await supabase.from('inquiry_messages').select('*').eq('room_id', roomId)
                                                                                .order('created_at', { ascending: true})
                if(error){
                    console.error('대화 내용을 가져오기 실패 api',error)
                    throw error
                }
                setMessages(data as InquiryMessage[] || [])
            } catch (error) {
                console.error(error)
                message.error('대화 내용을 불러오는데 실패했습니다.')
            }finally{
                setIsLoading(false)
            }
        }

        if(roomId) fetchMsgs()
    },[roomId, supabase, message])

    useEffect(() => {
        if(!roomId) return

        const chatChannel = supabase.channel(`inquiry-room-${roomId}`).on('postgres_changes',{
                                                                            event: 'INSERT',
                                                                            schema: 'public',
                                                                            table: 'inquiry_messages',
                                                                            filter: `room_id=eq.${roomId}`
                                                                        }, (payload) => {
                                                                            const newMsg = payload.new as InquiryMessage
                                                                            setMessages((prev) => [...prev, newMsg])
                                                                        }).subscribe()
        return () => {
            supabase.removeChannel(chatChannel)
        }


    }, [roomId])

    return { messages, isLoading, setMessages}
}