'use client'

import { useState } from 'react'
import {
  Headphones, MessageSquarePlus, ChevronRight,
  Clock, X,
  Loader2
} from 'lucide-react'
import {
  Button, Modal, Badge, Empty,
  Form, Input, Select, message
} from 'antd'
import { useUserStore } from '@/entities/user/model'
import { InquiryCategory, InquiryRoom, useGenerateInquirNoti, useGetInquiryList, useGetInquiryUserNoti, usePostInquiry } from '@/entities/inquiry/model'
import { format } from 'date-fns'
import { StoreInquiryChatRoom } from '@/entities/inquiry/ui'

const CATEGORY_LABELS: Record<InquiryCategory, string> = {
  payout: '정산 및 수익',
  policy: '운영 정책/승인',
  system: '시스템 오류',
  refund: '환불 문의', //나중에 결제 연동까지 했을 때 넣을것,
  use_history: '이용 내역 문의',
  etc: '기타 문의'
}

export function StoreInquiryCard() {
  const [form] = Form.useForm()
  const profile = useUserStore(state => state.profile)
  const [isWriteOpen, setIsWriteOpen] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null)
  const [selectedRoomTitle, setSelectedRoomTitle] = useState<string>('')

  // * 자신의 문의 목록 가져오기 = 채팅방 가져오기 여러개 
  const { data: inquiryList = [], isPending: isListPending } = useGetInquiryList({ userId: profile?.id ?? '', userType: 'owner' })

  const { mutate: postInquiry, isPending: isSubmitting } = usePostInquiry()

  // * 유저가 받은 알림 가져오기
  const { data: userNoti } = useGetInquiryUserNoti(profile?.id ?? '')

  // * 유저가 관리자에게 보낼 알림 보내기
  const { mutate: sendNoti} = useGenerateInquirNoti()


  const onFinishInquiry = (values: { category: InquiryCategory, title: string, content: string }) => {
    if (!profile?.id) {
      message.error('로그인 정보를 확인할 수 없습니다. 다시 로그인해주세요.')
      return
    }

    postInquiry({
      userId: profile.id,
      userType: 'owner',
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
        setIsWriteOpen(false)
        form.resetFields()
      }
    })
  }

  const handleOpenDetail = (room: InquiryRoom) => {
    setSelectedRoomId(room.id)
    setSelectedRoomTitle(room.title)
    setIsDetailOpen(true)
  }

  return (
    <>
      <article className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center justify-between border-b border-gray-50 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
              <Headphones size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">관리자 문의 내역</h2>
              <p className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1">
                <Clock size={10} /> 평균 답변 시간 2시간 이내
              </p>
            </div>
          </div>
          <Button
            type="primary"
            onClick={() => setIsWriteOpen(true)}
            className="rounded-xl! font-bold! border-none! bg-emerald-500! hover:bg-emerald-700! transition-all! py-2!"
            icon={<MessageSquarePlus size={16} />}
          >
            새 문의 등록
          </Button>
        </div>

        <div className="mt-4 space-y-2">
          {isListPending ? (
            <div><Loader2 className="w-8 h-8 text-orange-500 animate-spin mb-2" /> </div>
          ) :
            inquiryList.length > 0 ? (
              inquiryList.map((item) => {
                const roomNoti = userNoti?.filter(noti => noti.room_id === item.id).sort((a,b) => (b.created_at).localeCompare(a.created_at))[0]

                // * 방별 안읽음 뱃지 표시
                const hasUnread = roomNoti && !roomNoti.is_read
                return (
                  <div
                    key={item.id}
                    onClick={() => handleOpenDetail(item)}
                    className="group flex items-center justify-between rounded-2xl border border-gray-50 bg-gray-50/50 p-4 transition-all hover:bg-white hover:border-orange-200 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      {item.status === 'completed' && hasUnread && (
                        <Badge status="processing" color="orange" />
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-gray-400">
                            {CATEGORY_LABELS[item.category] || '기타 문의'}
                          </span>
                          <p className="text-sm font-bold text-gray-900 line-clamp-1">{item.title}</p>
                        </div>
                        <p className="text-[11px] text-gray-400 mt-0.5">{format(new Date(item.created_at), 'HH:MM')}</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-300 transition-colors group-hover:text-orange-500" />
                  </div>
                )
              })
            ) : (
              <Empty description="남긴 문의가 없습니다." image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
        </div>


      </article>

      <Modal
        title={<span className="text-lg font-bold">새 문의 등록</span>}
        open={isWriteOpen}
        onCancel={() => setIsWriteOpen(false)}
        footer={null}
        centered
        width={480}
        closeIcon={<X size={20} className="text-gray-400" />}
      >
        <Form form={form} layout="vertical" onFinish={onFinishInquiry} className="mt-4!">
          <Form.Item label="문의 유형" name="category" rules={[{ required: true }]}>
            <Select
              placeholder="분류를 선택해주세요"
              options={Object.entries(CATEGORY_LABELS).map(([key, value]) => ({
                value: key,
                label: value
              }))}
              className="h-11!"
            />
          </Form.Item>
          <Form.Item label="제목" name="title" rules={[{ required: true }]}>
            <Input placeholder="요약된 제목을 입력하세요" className="h-11! rounded-xl!" />
          </Form.Item>
          <Form.Item label="문의 내용" name="content" rules={[{ required: true }]}>
            <Input.TextArea placeholder="상세 내용을 입력하세요" rows={5} className="rounded-xl! p-4! resize-none!" />
          </Form.Item>
          <div className="flex gap-3 mt-8">
            <Button size="large" className="flex-1 rounded-xl border-gray-200" onClick={() => setIsWriteOpen(false)}>취소</Button>
            <Button type="primary" htmlType="submit" size="large" loading={isSubmitting} className="flex-1 rounded-xl bg-emerald-500! font-bold! hover:bg-emerald-700!">접수하기</Button>
          </div>
        </Form>
      </Modal>

      {/* //* 채팅방 내용  */}
      <Modal
        title={<span className="text-lg font-bold text-gray-900">1:1 실시간 상담톡</span>}
        open={isDetailOpen}
        onCancel={() => setIsDetailOpen(false)}
        footer={null}
        centered
        width={520}
        destroyOnHidden
      >
        {selectedRoomId && (
          <div className="mt-4">
            {selectedRoomId ? (
              <StoreInquiryChatRoom roomId={selectedRoomId} />
            ) : (
              <div className="text-center py-10 text-gray-400">방 정보를 찾을 수 없습니다.</div>
            )}
          </div>

        )}
      </Modal>
    </>
  )
}
