'use client'

import { useGenerateInquirNoti } from "@/entities/inquiry/model/useGenerateInquirNoti"
import { useInquiryChat } from "@/entities/inquiry/model/useInquiryChat"
import { useReadInquiryNotiByRoom } from "@/entities/inquiry/model/useReadInquiryNotiByRoom"
import { useSendMsg } from "@/entities/inquiry/model/useSendMsg"
import { useUserStore } from "@/entities/user/model/useUserStore"
import { Button, Form, Input } from "antd"
import { format, isSameDay } from "date-fns"
import { ko } from "date-fns/locale"
import { Loader2, Send, ShieldCheck, User } from "lucide-react"
import { useEffect, useRef } from "react"

export function StoreInquiryChatRoom({ roomId }: { roomId: string }) {
    const [form] = Form.useForm()

    const messagesEndRef = useRef<HTMLDivElement>(null)

    const profile = useUserStore(state => state.profile)

    const { messages, isLoading } = useInquiryChat(roomId)

    // * 메시지전송
    const { mutate: sendMsg, isPending: isSending } = useSendMsg()
    // * 알림전송
    const { mutate: sendNoti } = useGenerateInquirNoti()
    //* 읽은 처리
    const {mutate: readInquiryByRoom} = useReadInquiryNotiByRoom()

    const isOwner = profile?.role === 'owner'
    
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isLoading])

    useEffect(() => {
        if(!roomId) return
        readInquiryByRoom({roomId, type: 'inquiry_res'}) // 사장 알림을 읽음처리하는거니깐
    },[readInquiryByRoom, roomId])

    const onSendMsg = (values: { text: string }) => {
        if (!values.text.trim() || !profile?.id) return

        sendMsg({
            roomId,
            senderId: profile.id,
            senderType: profile.role,
            message: values.text.trim()
        }, {
            onSuccess: () => {
                sendNoti({
                    roomId,
                    userId: profile.id,
                    msgType: 'inquiry_new_req',
                    title: '새 문의 메시지',
                    message: values.text.trim()
                })
                form.resetFields()
            }
        })
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.nativeEvent.isComposing) {
            return
        }

        if (e.key === 'Enter') {
            e.preventDefault()
            form.submit()
        }
    }

    if (isLoading) {
        return (
            <div className={`h-112 w-full ${isOwner ? 'bg-emerald-50/20' : 'bg-orange-50/20'} flex flex-col items-center justify-center`}>
                <Loader2 className={`w-8 h-8 ${isOwner ? 'text-emerald-500' : 'text-orange-500'} animate-spin mb-2`} />
                <p className={`text-xs ${isOwner ? 'text-emerald-400' : 'text-orange-400'} font-bold`}>대화 내용을 불러오는 중...</p>
            </div>
        )
    }

    return (
        // <div className="flex flex-col h-120 bg-gray-50/50 rounded-2xl border border-gray-100 overflow-hidden">
        <div className={`flex flex-col bg-gray-50/50 rounded-2xl  overflow-hidden
        ${isOwner ? 'h-120' : 'h-[65vh]'} 
    `}>
        {/* <div className="flex flex-col h-full bg-gray-50/50 rounded-2xl border border-gray-100 overflow-hidden"> */}

            <div className="flex-1 overflow-y-auto p-4 border border-gray-100 space-y-4 scrollbar-none">
                {messages.map((msg, i) => {
                    const prevMsg = messages[i - 1]

                    const isFirstOfDay = !prevMsg || !isSameDay(new Date(prevMsg.created_at), new Date(msg.created_at))

                    const isMe = msg.sender_type === 'owner' || msg.sender_type === 'user'

                    return (
                        <div key={msg.id}>
                            {isFirstOfDay && (
                                <div className="flex justify-center my-3">
                                    <span className="text-[11px] bg-gray-200 text-gray-600 px-3 py-1 rounded-full">
                                        {format(new Date(msg.created_at), 'yyyy년 M월 d일 EEEE', {locale: ko})}
                                    </span>
                                </div>
                            )}
                            <div className={`flex gap-2.5 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>


                                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-sm text-white
                                                ${isMe ? (isOwner ? 'bg-emerald-500' : 'bg-orange-500') : 'bg-blue-500'}`}
                                >
                                    {isMe ? <User size={14} /> : <ShieldCheck size={14} />}
                                </div>


                                <div className={`flex flex-col max-w-[70%] ${isMe ? 'items-end' : 'items-start'}`}>

                                    <div className="flex items-center gap-1.5 mb-1">
                                        <span className="text-[11px] font-bold text-gray-700">
                                            {isMe ? '나' : '멍패스 지원팀'}
                                        </span>
                                    </div>


                                    <div className={`flex items-end gap-1.5 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                                        <div className={`rounded-2xl px-4 py-2.5 text-sm leading-6 shadow-sm
                                                       ${isMe
                                                ? `${isOwner ? 'bg-emerald-500' : 'bg-orange-400'} text-white rounded-tr-none font-medium`
                                                : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'}`}
                                        >
                                            <p className="whitespace-pre-wrap">{msg.message}</p>
                                        </div>
                                        <span className="text-[9px] text-gray-400 shrink-0 mb-0.5 select-none">
                                            {format(new Date(msg.created_at), 'HH:mm')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div ref={messagesEndRef} />
            </div>

            <div className="pt-3 pb-6 w-full">
                <Form form={form} onFinish={onSendMsg} className="flex gap-2 m-0!">
                    <Form.Item name="text" className="flex-1 mb-0!">
                        <Input
                            placeholder="메시지를 입력하세요..."
                            autoComplete="off"
                            disabled={isSending}
                            className={`h-11! rounded-xl! px-4! border-gray-200! focus:border-emerald-500! shadow-none!
                                    ${isOwner ? 'focus:border-emerald-500!' : 'focus:border-orange-500!'}`}
                            onKeyDown={handleKeyDown}
                        />
                    </Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isSending}
                        icon={<Send size={16} />}
                        className={`h-11! w-11! rounded-xl! border-none! flex items-center justify-center text-white
                            ${isOwner 
                                ? 'bg-emerald-500! hover:bg-emerald-700!' 
                                : 'bg-orange-500! hover:bg-orange-700!'}`}
                    />
                </Form>
            </div>

        </div>
    )
}