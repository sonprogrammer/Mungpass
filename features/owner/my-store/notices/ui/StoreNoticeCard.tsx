'use client'

// TODO is_show 보여줄 지 말지 하는 토글 스위치, 삭제하는것도 하기

import { useState } from 'react'
import { Megaphone, Edit3, AlertCircle, Calendar, Save, X } from 'lucide-react'
import { Button, Modal, Input, Form, Divider, Empty } from 'antd'
import { useGetNotices } from '../model/useGetNotices'
import { format } from 'date-fns'
import { useSaveNotice } from '../model/useSaveNotice'
import { formatTime } from '@/shared/utils/formatDate'

interface NoticeType {
  id: string
  title: string;
  content: string;
  updated_at: string;
  is_show?: boolean
}

export function StoreNoticeCard({ shopId }: { shopId: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()

  // * 공지사항 있는거 가져오기
  const { data: storeNotices, isPending } = useGetNotices(shopId)

  // * 공지사항 수정 / 등록
  const {mutate: saveNotice, isPending: saving} = useSaveNotice(shopId)

  const [selectedNotice, setSelectedNotice] = useState<NoticeType | null>(null)

  const openModal = (notice?: NoticeType) => {
    if (notice) {
      setSelectedNotice(notice)
      form.setFieldsValue({
        title: notice.title,
        content: notice.content
      })
    } else {
      setSelectedNotice(null)
      form.resetFields()
    }
    setIsModalOpen(true)
  }


  //   TODO 수정해줘야함
  const handleSave = (values: { is_show: boolean, title: string, content: string }) => {
      saveNotice({
        shopId: shopId,
        noticeId: selectedNotice?.id,
        postData: {
          title: values.title,
          content: values.content,
          is_show: values.is_show ?? true
        }
      },{
        onSuccess: () => {
          setIsModalOpen(false)
          form.resetFields()
        }
      })
  }

  const recentUpdate = storeNotices && storeNotices.length > 0 ?
         [...storeNotices]?.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())[0].updated_at
          : null

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
              </div>

              {recentUpdate && (
                <p className="text-xs text-gray-400">최근 업데이트: {formatTime(recentUpdate)}</p>
              )}
            </div>
          </div>

          <Button
            type="text"
            onClick={() => openModal()}
            className=" hover:text-blue-500!"
            icon={<Edit3 size={14} />}
          >
            <span className="ml-1 text-sm font-medium">게시</span>
          </Button>
        </div>


        <div className="space-y-3 max-h-100 overflow-y-auto pr-1 custom-scrollbar">
          {isPending ? (
            <div className="py-10 text-center text-gray-400">불러오는 중...</div>
          ) : storeNotices && storeNotices.length > 0 ? (
            storeNotices.map((item: NoticeType) => (
              <div
                key={item.id}
                onClick={() => openModal(item)}
                className="group cursor-pointer rounded-2xl bg-gray-50 p-4 transition-all hover:bg-white hover:shadow-md border border-transparent hover:border-blue-100"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle size={14} className="text-blue-400" />
                    <h3 className="text-[14px] font-bold text-gray-800 line-clamp-1">{item.title}</h3>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">
                    {format(new Date(item.updated_at), 'MM.dd')}
                  </span>
                </div>
                <p className="text-[13px] leading-5 text-gray-500 line-clamp-2 pl-5 font-medium">
                  {item.content}
                </p>
              </div>
            ))
          ) : (
            <Empty description="등록된 공지사항이 없습니다." image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-gray-50">
          <p className="flex items-center gap-1.5 text-[11px] text-gray-400">
            <Calendar size={12} />
            목록 중 가장 최근 공지가 유저 앱 상단에 노출됩니다.
          </p>
        </div>
      </article>

      <Modal
        title={
          <div className="pb-2">
            <h2 className="text-xl font-bold text-gray-900">
              {selectedNotice ? '공지사항 수정' : '새 공지사항 등록'}
            </h2>
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
          onFinish={handleSave}
          className="mt-4!"
        >
          <div className="space-y-5">


            <Form.Item
              label={<span className="font-bold text-gray-700">공지 제목</span>}
              name="title"
              rules={[{ required: true, message: '공지 제목을 입력해주세요' }]}
            >
              <Input placeholder="예시: 이번 주 운영 안내" className="h-12 rounded-xl border-gray-200" />
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
                required={true}
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
              loading={saving}
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