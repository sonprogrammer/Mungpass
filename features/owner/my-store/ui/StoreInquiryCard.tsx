'use client'

import { useState } from 'react'
import { 
  Headphones, MessageSquarePlus, ChevronRight, CheckCircle2, 
  Clock, User, ShieldCheck, X, Info 
} from 'lucide-react'
import { 
  Button, Modal, Badge, Empty, Divider, 
  Form, Input, Select, message
} from 'antd'

// 목업
const MOCK_HISTORY = [
  {
    id: 1,
    category: 'payout',
    categoryLabel: '정산 및 수익',
    title: '정산 기준 및 정산일 문의',
    content: '이번 달 정산일이 공휴일인데, 전날에 입금되나요 아니면 다음 날에 되나요?',
    status: 'pending',
    createdAt: '2026-03-23 14:00',
    answer: null
  },
  {
    id: 2,
    category: 'policy',
    categoryLabel: '운영 정책/승인',
    title: '사업자 서류 재업로드 관련',
    content: '사업자 등록증 주소가 변경되어 서류를 다시 올리고 싶습니다. 어디서 하나요?',
    status: 'completed',
    createdAt: '2026-03-21 10:30',
    answer: {
      content: '안녕하세요 사장님! 멍패스 운영팀입니다. 사업자 정보 변경은 [매장 관리 > 기본 정보 수정] 메뉴에서 서류를 새로 업로드하실 수 있습니다. 승인까지는 영업일 기준 1~2일이 소요됩니다.',
      answeredAt: '2026-03-21 15:45'
    }
  }
]

interface MockTypes{
  id: number;
  category: string;
  categoryLabel: string;
  title: string;
  content: string;
  status: string;
  createdAt: string;
  answer: {
    content: string;
    answeredAt: string;
  } | null
}

export function StoreInquiryCard() {
  const [form] = Form.useForm()
  const [isWriteOpen, setIsWriteOpen] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [selectedInquiry, setSelectedInquiry] = useState<MockTypes | null>(null)

  // TODO api연동
  const onFinishInquiry = (values: {category: string,title: string, content: string}) => {
    console.log('문의 데이터 전송:', values)
    message.success('문의가 접수되었습니다. 담당자 확인 후 답변 드릴게요.')
    setIsWriteOpen(false)
    form.resetFields()
  }

  const handleOpenDetail = (item: MockTypes) => {
    setSelectedInquiry(item)
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
          {MOCK_HISTORY.length > 0 ? (
            MOCK_HISTORY.map((item) => (
              <div 
                key={item.id}
                onClick={() => handleOpenDetail(item)}
                className="group flex items-center justify-between rounded-2xl border border-gray-50 bg-gray-50/50 p-4 transition-all hover:bg-white hover:border-orange-200 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  {item.status === 'pending' ? (
                    <Badge status="processing" color="orange" />
                  ) : (
                    <CheckCircle2 size={18} className="text-emerald-500" />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-gray-400">{item.categoryLabel}</span>
                      <p className="text-sm font-bold text-gray-900 line-clamp-1">{item.title}</p>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-0.5">{item.createdAt}</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-300 transition-colors group-hover:text-orange-500" />
              </div>
            ))
          ) : (
            <Empty description="남긴 문의가 없습니다." image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </div>

        <button className="mt-3 w-full py-1 text-center text-[11px] font-semibold text-gray-400 hover:text-orange-500">
          이전 문의 내역 더보기
        </button>
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
              options={[
                  { value: 'policy', label: '운영 정책/승인' },
                  { value: 'system', label: '시스템 오류' },
                  { value: 'etc', label: '기타 문의' },
              ]}
              className="h-11! custom-select"
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
            <Button type="primary" htmlType="submit" size="large" className="flex-1 rounded-xl bg-emerald-500! font-bold! hover:bg-emerald-700!">접수하기</Button>
          </div>
        </Form>
      </Modal>

      <Modal
        title={<span className="text-lg font-bold text-gray-900">상담 히스토리</span>}
        open={isDetailOpen}
        onCancel={() => setIsDetailOpen(false)}
        footer={<Button block size="large" onClick={() => setIsDetailOpen(false)} className="rounded-xl! font-bold! text-white! bg-emerald-500! hover:bg-emerald-700!">확인</Button>}
        centered
        width={520}
      >
        {selectedInquiry && (
          <div className="py-4 space-y-6">
            <div className="flex gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-400 shadow-sm">
                <User size={18} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-bold text-gray-800">나의 문의</span>
                  <span className="text-[11px] text-gray-400 font-medium tracking-tight">{selectedInquiry.createdAt}</span>
                </div>
                <div className="rounded-2xl rounded-tl-none bg-gray-50 border border-gray-100 p-4 text-sm leading-7 text-gray-600">
                  <p className="font-extrabold text-gray-900 mb-1 leading-tight">Q. {selectedInquiry.title}</p>
                  {selectedInquiry.content}
                </div>
              </div>
            </div>

            <Divider  />

            <div className="flex gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-500 shadow-sm border border-blue-100">
                <ShieldCheck size={18} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-bold text-blue-600">관리자 답변</span>
                  {selectedInquiry.answer && (
                    <span className="text-[11px] text-gray-400 font-medium tracking-tight">{selectedInquiry.answer.answeredAt}</span>
                  )}
                </div>
                
                {selectedInquiry.answer ? (
                  <div className="rounded-2xl rounded-tl-none bg-blue-50/40 p-4 text-sm leading-7 text-gray-700 border border-blue-100">
                    {selectedInquiry.answer.content}
                  </div>
                ) : (
                  <div className="rounded-2xl bg-amber-50/50 p-4 border border-amber-100">
                    <div className="flex items-center gap-2 text-amber-600 mb-1">
                      <Info size={14} />
                      <span className="text-xs font-bold uppercase tracking-wide">Pending Review</span>
                    </div>
                    <p className="text-xs text-amber-700 leading-5">
                      담당자가 문의 내용을 확인 중입니다. 영업시간 내에 빠르게 답변 드릴 수 있도록 노력하겠습니다.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}