'use client'

import { InquiryCategory, InquiryRoom } from "@/entities/inquiry/model/types"
import { useGenerateInquirNoti } from "@/entities/inquiry/model/useGenerateInquirNoti"
import { useGetInquiryUserNoti } from "@/entities/inquiry/model/useGetInquiryUserNoti"
import { useGetInquiryList } from "@/entities/inquiry/model/useGetInquriyList"
import { usePostInquiry } from "@/entities/inquiry/model/usePostInquiry"
import { StoreInquiryChatRoom } from "@/entities/inquiry/ui/StoreInquiryChatRoom"
import { useUserStore } from "@/entities/user/model/useUserStore"
import { NewInquiryForm } from "@/features/user/userChat/ui/NewInquiryForm"
import { App, Badge, Empty } from "antd"
import { format } from "date-fns/format"
import { ChevronLeft, ChevronRight, Clock, Loader2, MessageSquarePlus } from "lucide-react"
import { useState } from "react"

const CATEGORY_LABELS: Record<InquiryCategory, string> = {
    payout: '정산 및 수익',
    policy: '운영 정책/승인',
    system: '시스템 오류',
    refund: '환불 문의',
    use_history: '이용 내역 문의',
    etc: '기타 문의'
}


export function ChatInquiryContent() {
    const [viewMode, setViewMode] = useState<'list' | 'write' | 'chat'>('list')
    const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null)
    // * 채팅방 생성 
    const { mutate: postInquiry, isPending: isSubmitting } = usePostInquiry()

    const profile = useUserStore(state => state.profile)
    //* 채팅방 목록 가져오기
    const { data: inquiryList = [], isPending: isListPending } = useGetInquiryList({ userId: profile?.id || '', userType: 'user' })
    //* 일반 유저 알림 가졍괴
    const { data: userNoti } = useGetInquiryUserNoti(profile?.id ?? '')
    // * 관리자에게 알림 보내기
    const { mutate: sendNoti } = useGenerateInquirNoti()

    const { message } = App.useApp()


    const handleSubmitInquiry = (values: { category: InquiryCategory, title: string, content: string }) => {
        if (!profile?.id) {
            message.error('로그인 정보를 확인 할 수 없습니다.')
            return
        }
        postInquiry({
            userId: profile.id,
            userType: 'user',
            category: values.category,
            title: values.title,
            firstMsg: values.content
        }, {
            onSuccess: (data) => {
                sendNoti({
                    roomId: data.id,
                    userId: profile.id,
                    msgType: 'inquiry_new_req',
                    title: values.title,
                    message: values.content
                })
                setViewMode('list')
            }
        })
    }

    const handleOpenDetail = (room: InquiryRoom) => {
        setSelectedRoomId(room.id)
        setViewMode('chat')
    }

    if (viewMode === 'write') {
        return (
            <div className="flex flex-col h-full animate-fade-in">
                <button
                    onClick={() => setViewMode('list')}
                    className="flex items-center gap-1 text-xs text-gray-500 font-medium hover:underline cursor-pointer hover:text-gray-800 transition-colors w-fit p-2"
                >
                    <ChevronLeft size={14} /> 목록으로 돌아가기
                </button>
                <div className="flex-1 overflow-y-auto bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                    <NewInquiryForm
                        onFinish={handleSubmitInquiry}
                        isSubmitting={isSubmitting}
                        onCancel={() => setViewMode('list')}
                    />
                </div>
            </div>
        )
    }

    if (viewMode === 'chat' && selectedRoomId) {
        return (
            <div className="flex flex-col h-full flex-1 animate-fade-in">
                <button
                    onClick={() => setViewMode('list')}
                    className="flex items-center gap-1 text-xs text-gray-500 font-medium hover:underline cursor-pointer hover:text-gray-800 transition-colors w-fit p-2"
                >
                    <ChevronLeft size={14} /> 목록으로 돌아가기
                </button>
                <div className="flex-1 overflow-y-auto">
                    <StoreInquiryChatRoom roomId={selectedRoomId} />
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between bg-gray-50/50 border border-gray-100 rounded-2xl p-4 mb-4">
                <div className="flex items-center gap-1 text-[11px] text-gray-400 font-medium">
                    <Clock size={12} className="text-orange-400" /> 평균 답변 시간 2시간 이내
                </div>
                <button
                    onClick={() => setViewMode('write')}
                    className="flex items-center gap-1.5 text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 transition-colors px-3 py-2 rounded-xl shadow-sm shadow-orange-500/10"
                >
                    <MessageSquarePlus size={14} /> 새 문의하기
                </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1 max-h-90">
                {isListPending ? (
                    <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 text-orange-500 animate-spin" /></div>
                ) : inquiryList.length > 0 ? (
                    inquiryList.map((item) => {
                        const roomNoti = userNoti?.filter(noti => noti.room_id === item.id).sort((a, b) => (b.created_at).localeCompare(a.created_at))[0]
                        const lastDisplayTime = roomNoti ? roomNoti.created_at : item.created_at
                        const hasUnread = roomNoti && !roomNoti.is_read

                        return (
                            <div
                                key={item.id}
                                onClick={() => handleOpenDetail(item)}
                                className="group flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 transition-all hover:border-orange-200 hover:bg-orange-50/10 cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    {item.status === 'completed' && hasUnread && (
                                        <Badge status="processing" color="orange" />
                                    )}
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-black text-slate-400 tracking-wider">
                                                {CATEGORY_LABELS[item.category] || '기타 문의'}
                                            </span>
                                            <h4 className="text-sm font-bold text-gray-800 line-clamp-1">{item.title}</h4>
                                        </div>
                                        <p className="text-[11px] text-gray-400 mt-0.5">{format(new Date(lastDisplayTime), 'HH:mm')}</p>
                                    </div>
                                </div>
                                <ChevronRight size={16} className="text-gray-300 transition-colors group-hover:text-orange-500" />
                            </div>
                        )
                    })
                ) : (
                    <div className="py-8">
                        <Empty description="남긴 문의가 없습니다." image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    </div>
                )}
            </div>
        </div>
    )
}