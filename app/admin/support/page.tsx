'use client'

import { useState, useEffect, useRef } from "react";
import {
    Table,
    Tag,
    Card,
    Form,
    Row,
    Col,
    Empty,
    Typography,
    Avatar,
    App
} from "antd";

import { useTable } from "@refinedev/antd";
import { HttpError } from "@refinedev/core";

import { useGetInquiryMsg } from "@/entities/admin/inquiry/model/useGetInquiryMsg";
import { useUserStore } from "@/entities/user/model/useUserStore";
import { useUpdateInquiryRoomStatus } from "@/entities/admin/inquiry/model/useUpdateInquiryRoomStatus";
import { useGenerateInquirNoti } from "@/entities/inquiry/model/useGenerateInquirNoti";
import { InquiryRoom, InquiryRoomWithProfile, Profile } from "@/entities/admin/inquiry/model/types";
import { useInquiryRealtime } from "@/entities/admin/inquiry/model/useInquiryRealtime";
import { InquiryMsgList } from "@/entities/admin/inquiry/ui/InquiryMsgList";
import { InquiryReplyForm } from "@/entities/admin/inquiry/ui/InquiryReplyForm";
import { useSendMsg } from "@/entities/inquiry/model/useSendMsg";
import { useReadInquiryNotiByRoom } from "@/entities/inquiry/model/useReadInquiryNotiByRoom";
import { UserOutlined } from "@ant-design/icons";
import { AdminUserDetailModal } from "@/entities/admin/userInfo/ui/AdminUserDetailModal";
import { InquiryCategory } from "@/entities/inquiry/model/types";
import { format } from "date-fns/format";
import { X } from "lucide-react";


const CATEGORY_LABELS: Record<InquiryCategory, string> = {
    payout: '정산 및 수익',
    policy: '운영 정책/승인',
    system: '시스템 오류',
    refund: '환불 문의', //나중에 결제 연동까지 했을 때 넣을것,
    use_history: '이용 내역 문의',
    etc: '기타 문의'
}

export default function AdminInquiryChatPage() {
    const [form] = Form.useForm()
    const messageEndRef = useRef<HTMLDivElement>(null)
    // const [selectedRoom, setSelectedRoom] = useState<InquiryRoom | null>(null)
    const [selectedRoom, setSelectedRoom] = useState<InquiryRoomWithProfile | null>(null)
    const [selectedUser, setSelectedUser] = useState<Profile | null>(null)
    const [isUserModalOpen, setIsUserModalOpen] = useState(false)

    const { message } = App.useApp()

    //* 처음 렌더시 메시지 가져오기
    const { data: messages = [] } = useGetInquiryMsg(selectedRoom?.id ?? '')

    const profile = useUserStore(state => state.profile)
    //* 답변하는 훅
    const { mutate: sendReply, isPending: sending } = useSendMsg()
    //* 채팅방 상태 변경 훅
    const { mutate: updateRoomStatus } = useUpdateInquiryRoomStatus()
    //* 채팅방 알림 훅 - 유저에게 보낼 알림임
    const { mutate: inquiryNoti } = useGenerateInquirNoti()
    // * 채팅방에 들어가서 답변을 해야지 알림이 사라짐
    const { mutate: readInquiryByRoom } = useReadInquiryNotiByRoom()

    //* 문의 채팅방 목록 조회
    const { tableProps, tableQuery } = useTable<InquiryRoomWithProfile, HttpError>({
        resource: "inquiries_room",
        meta: {
            select: `
            *,
            profile:profiles(
                *,
                shop: shops(
                *
                )
            )
            `
        },
        sorters: {
            initial: [
                {
                    field: "created_at",
                    order: "desc",
                },
            ],
        },
        pagination: {
            mode: "client",
            pageSize: 12,
        },
    });

    // * 실시간채팅
    useInquiryRealtime(selectedRoom?.id ?? '')

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({
            behavior: "smooth",
        })
    }, [messages, selectedRoom?.id])

    // * 유저 아이콘 클릭
    const handleUserClick = (e: React.MouseEvent, record: InquiryRoomWithProfile) => {
        e.stopPropagation()
        setSelectedUser(record.profile)
        setIsUserModalOpen(true)
    }

    //* 메시지 전송
    const handleSendMessage = async (values: { reply: string }) => {
        if (!selectedRoom) return

        if (!profile?.id) {
            message.error('로그인이 필요합니다.')
            return
        }

        try {
            sendReply({
                roomId: selectedRoom.id,
                senderId: profile.id,
                senderType: profile.role,
                message: values.reply
            }, {
                onSuccess: () => {
                    // * 유저에게 온 채팅 알림 읽음 처리
                    readInquiryByRoom({ roomId: selectedRoom.id, type: 'inquiry_new_req' })

                    updateRoomStatus(selectedRoom.id)

                    // * 알림 생성
                    inquiryNoti({
                        roomId: selectedRoom.id,
                        userId: selectedRoom.user_id,
                        msgType: "inquiry_res",
                        title: "✉️ 관리자의 답변이 도착했습니다.",
                        message:
                            values.reply.length > 25
                                ? `${values.reply.slice(0, 25)}...`
                                : values.reply,
                    })

                    form.resetFields()
                    tableQuery.refetch()
                    message.success("답변이 전송되었습니다.")
                }
            })
        } catch (error) {
            console.error("답변 전송 오류", error)
            message.error("메시지 전송에 실패했습니다.")
        }
    }

    return (
        <>
            <div style={{ padding: "24px" }}>
                <Typography.Title level={2} style={{ marginBottom: "24px" }}>
                    1:1 문의 실시간 센터
                </Typography.Title>

                <Row gutter={16}>

                    <Col xs={24} lg={10}>
                        <Card title="진행 중인 문의 대화방">
                            <Table
                                {...tableProps}
                                rowKey="id"
                                onRow={(record) => ({
                                    onClick: () => setSelectedRoom(record),
                                    style: {
                                        cursor: "pointer",
                                        background:
                                            selectedRoom?.id === record.id
                                                ? "#e6f7ff"
                                                : "transparent",
                                    },
                                })}
                            >
                                <Table.Column
                                    title="사용자"
                                    render={(_, record: InquiryRoomWithProfile) => {
                                        const isOwner = record.profile.role === 'owner'
                                        return (
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleUserClick(e, record)
                                                }}
                                                className="flex items-center gap-3 hover:bg-black/20 p-2 rounded-2xl">
                                                {/* //TODO 확인후 디자인 수정 */}
                                                <Avatar
                                                    size={30}
                                                    src={record.profile.avatar_url || undefined}
                                                    icon={<UserOutlined />}
                                                />
                                                <div className="flex flex-col">
                                                    <span className="font-semibold">
                                                        {isOwner ? record.profile.shop?.[0]?.name || '매장명 없음'
                                                            : record.profile.name
                                                        }
                                                    </span>
                                                    <span className="text-xs text-gray-400">
                                                        {isOwner ? '사장 회원' : '일반 회원'}
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    }
                                    }
                                />

                                <Table.Column
                                    dataIndex="category"
                                    title="문의 주제"
                                    ellipsis
                                />
                                <Table.Column
                                    dataIndex="status"
                                    title="상태"
                                    render={(status: InquiryRoom["status"]) => (
                                        <Tag
                                            color={
                                                status === "pending"
                                                    ? "red"
                                                    : "green"
                                            }
                                        >
                                            {status === "pending"
                                                ? "미답변"
                                                : "답변완료"}
                                        </Tag>
                                    )}
                                />
                            </Table>
                        </Card>
                    </Col>
                    {/* //* 채팅 */}
                    <Col xs={24} lg={14}>
                        {selectedRoom ? (
                            <Card
                                title={
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-gray-800">
                                                {selectedRoom.profile?.role === 'owner'
                                                    ? `[${selectedRoom.profile.shop?.[0]?.name || '매장명 없음'}]`
                                                    : `[${selectedRoom.profile?.name || '일반 회원'}]`
                                                }
                                            </span>
                                            <span className="text-sm text-gray-500 font-normal border-l pl-2 border-gray-300">
                                                {selectedRoom.title}
                                            </span>
                                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded border border-gray-200">
                                                {CATEGORY_LABELS[selectedRoom.category] || '기타 문의'}
                                            </span>
                                        </div>
                                        <p className="text-xs">
                                            <span>문의 날짜 : </span>
                                            <span>
                                                {format(new Date(selectedRoom.created_at), 'MM월 dd일 HH:mm')}
                                            </span>
                                        </p>
                                    </div>
                                }
                                extra={
                                    <button
                                        onClick={() => setSelectedRoom(null)}
                                        className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-center"
                                        title="대화방 닫기"
                                    >
                                            <X size={20} />
                                    </button>
                                }
                                style={{
                                    height: "650px",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                                styles={{
                                    body: {
                                        flex: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                        overflow: "hidden",
                                        padding: "12px",
                                    },
                                }}
                            >
                                {/* //*메시지 */}
                                <InquiryMsgList
                                    messages={messages}
                                    selectedRoom={selectedRoom}
                                    messageEndRef={messageEndRef}
                                    onUserClick={() => {
                                        setSelectedUser(selectedRoom.profile)
                                        setIsUserModalOpen(true)
                                    }}
                                />
                                <InquiryReplyForm
                                    form={form}
                                    onFinish={handleSendMessage}
                                    loading={sending}
                                />
                            </Card>
                        ) : (
                            <Card
                                style={{
                                    height: "650px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Empty description="대화방을 선택해주세요." />
                            </Card>
                        )}
                    </Col>
                </Row>
            </div>
            <AdminUserDetailModal
                open={isUserModalOpen}
                onClose={() => setIsUserModalOpen(false)}
                user={selectedUser}
            />
        </>
    );
};