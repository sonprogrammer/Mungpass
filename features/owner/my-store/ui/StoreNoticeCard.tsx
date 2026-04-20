'use client'

import { useState } from 'react'
import { Megaphone, Edit3, AlertCircle, Calendar, Save, X } from 'lucide-react'
import { Button, Tag, Modal, Input, Form, message, Switch, Divider } from 'antd'

export function StoreNoticeCard() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()

  // 목업
  const [notice, setNotice] = useState({
    title: '이번 주 운영 안내',
    content: '1. 주말은 방문 고객이 많아 체크인 대기가 발생할 수 있습니다.\n2. 미용 서비스는 사전 예약 고객 우선으로 진행됩니다.\n3. 3월 25일은 내부 일정으로 인해 임시 휴무입니다.',
    isUrgent: true,
    updatedAt: '2026.03.23'
  })

  //   TODO 수정해줘야함
  const handleSave = (values: {isUrgent: boolean, title: string, content: string}) => {
    setNotice({ ...values, updatedAt: '2026.03.23' })
    message.success('공지사항이 안전하게 게시되었습니다.')
    setIsModalOpen(false)
  }

  return (
    <>
      <article className="group rounded-3xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center justify-between border-b border-gray-50 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
              <Megaphone size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-gray-900">가게 공지사항</h2>
                {notice.isUrgent && (
                  <Tag color="error" className="m-0 border-none font-bold rounded-md px-2 text-[10px]">중요</Tag>
                )}
              </div>
              <p className="text-xs text-gray-400">최근 업데이트: {notice.updatedAt}</p>
            </div>
          </div>

          <Button
            type="text"
            onClick={() => setIsModalOpen(true)}
            className=" hover:text-blue-500!"
            icon={<Edit3 size={14} />}
          >
            <span className="ml-1 text-sm font-medium">수정</span>
          </Button>
        </div>


        <div className="mt-4">
          <div
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer rounded-2xl bg-gray-50 p-5 transition-all hover:bg-gray-100 active:scale-[0.99]"
          >
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle size={16} className={notice.isUrgent ? 'text-rose-500' : 'text-gray-400'} />
              <h3 className="text-sm font-bold text-gray-900">{notice.title}</h3>
            </div>

            <div className="pl-4 border-l-2 border-blue-200">
              <p className="whitespace-pre-line text-sm leading-7 text-gray-600 font-medium">
                {notice.content}
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <p className="flex items-center gap-1.5 text-[11px] text-gray-400">
              <Calendar size={12} />
              보호자용 멍패스 앱 상단에 노출 중
            </p>
          </div>
        </div>
      </article>

      <Modal
        title={
          <div className="pb-2">
            <h2 className="text-xl font-bold text-gray-900">공지사항 수정</h2>
          </div>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        width={500}
        closeIcon={<X size={20} className="text-gray-400" />}
        className="custom-modal"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={notice}
          onFinish={handleSave}
          className="mt-4!"
        >
          <div className="space-y-5">
            <div className="flex items-center justify-between rounded-2xl bg-rose-50/50 p-4 border border-rose-100/50">
              <div>
                <p className="text-sm font-bold text-gray-900">중요 공지로 설정</p>
                <p className="text-xs text-gray-500 mt-0.5">앱 상단에 강조 표시되며 팝업으로 노출될 수 있습니다.</p>
              </div>
              <Form.Item name="isUrgent" valuePropName="checked" className="m-0!">
                <Switch
                  checkedChildren="ON"
                  unCheckedChildren="OFF"
                  className="bg-gray-200"
                />
              </Form.Item>
            </div>

            <Form.Item
              label={<span className="font-bold text-gray-700">공지 제목</span>}
              name="title"
              rules={[{ required: true, message: '공지 제목을 입력해주세요' }]}
            >
              <Input placeholder="예: 이번 주 운영 안내" className="h-12 rounded-xl border-gray-200" />
            </Form.Item>

            <Form.Item
              label={<span className="font-bold text-gray-700">공지 내용</span>}
              name="content"
              rules={[{ required: true, message: '내용을 입력해주세요' }]}
            >
              <Input.TextArea
                placeholder="보호자님들께 전달할 상세 내용을 입력하세요."
                rows={6}
                className="rounded-xl! border-gray-200! p-4! resize-none!"
              />
            </Form.Item>
          </div>

          <Divider className="my-6" />

          <div className="flex gap-3">
            <Button
              size="large"
              className="flex-1! h-12! rounded-xl! font-bold! border-gray-200! "
              onClick={() => setIsModalOpen(false)}
            >
              취소
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              icon={<Save size={18} />}
              className="flex-1! h-12! rounded-xl! bg-emerald-500! font-bold! hover:bg-emerald-700!"
            >
              공지사항 저장하기
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  )
}