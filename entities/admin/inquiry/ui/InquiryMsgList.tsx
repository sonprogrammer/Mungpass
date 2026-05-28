'use client'

import { InquiryMessage, InquiryRoom, InquiryRoomWithProfile } from "@/entities/admin/inquiry/model/types"
import { Typography } from "antd"
import { format, isSameDay } from "date-fns"
import { ko } from "date-fns/locale"
import { ShieldCheck, User } from "lucide-react"
import { RefObject } from "react"

interface InquiryMsgListProps {
    messages: InquiryMessage[]
    selectedRoom: InquiryRoomWithProfile
    messageEndRef: RefObject<HTMLDivElement | null>
    onUserClick: () => void
}

export function InquiryMsgList({ messages, selectedRoom, messageEndRef, onUserClick }: InquiryMsgListProps) {
    return (
        <div className="flex flex-col h-112 bg-gray-50/50 rounded-2xl border border-gray-100 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, i) => {
                    const prevMsg = messages[i - 1]

                    const isFirstOfDay = !prevMsg || !isSameDay(new Date(prevMsg.created_at), new Date(msg.created_at))
                    const isMe = msg.sender_type === "admin";

                    return (
                        <div key={msg.id}>
                            {isFirstOfDay && (
                                <div className="flex justify-center my-3">
                                    <span className="text-[11px] bg-gray-200 text-gray-600 px-3 py-1 rounded-full">
                                        {format(new Date(msg.created_at), 'yyyy년 M월 d일 EEEE', { locale: ko })}
                                    </span>
                                </div>
                            )}
                            <div className={`flex gap-2.5 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>

                                <div 
                                    onClick={() => !isMe && onUserClick()}
                                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-sm text-white
                                                ${isMe ? 'bg-emerald-500' : 'bg-blue-500'}`}
                                >
                                    {isMe ? <ShieldCheck size={14} /> : <User size={14} />}
                                </div>

                                <div className={`flex flex-col max-w-[70%] ${isMe ? 'items-end' : 'items-start'}`}>

                                    <div className="flex items-center gap-1.5 mb-1">
                                        <span className="text-[11px] font-bold text-gray-700">
                                            {isMe 
                                                ? '멍패스 운영팀' 
                                                : selectedRoom.profile?.role === 'owner'
                                                    ? selectedRoom.profile.shop?.[0]?.name || '매장명 없음'
                                                    : selectedRoom.profile?.name || '이름 없음'
                                            }
                                        </span>
                                    </div>


                                    <div className={`flex items-end gap-1.5 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                                        <div className={`rounded-2xl px-4 py-2.5 text-sm leading-6 shadow-sm
                                                                                    ${isMe
                                                ? 'bg-emerald-500 text-white rounded-tr-none font-medium'
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
                    );
                })}
                <div ref={messageEndRef} />
            </div>
        </div>
    )
}