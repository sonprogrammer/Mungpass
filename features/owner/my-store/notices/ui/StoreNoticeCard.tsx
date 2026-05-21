'use client'

import { useState } from 'react'
import { Megaphone, Edit3, AlertCircle, EyeOff, Trash2 } from 'lucide-react'
import { Button, Empty, App, Switch } from 'antd'
import { useGetNotices } from '../model/useGetNotices'
import { format } from 'date-fns'
import { formatTime } from '@/shared/utils/formatDate'
import { StoreNoticeModal } from '@/features/owner/my-store/notices/ui/StoreNoticeModal'
import { useSaveNotice } from '@/features/owner/my-store/notices/model/useSaveNotice'
import { NoticeType } from '@/features/owner/my-store/notices/model/types'
import { StoreNoticeDeleteCheckModal } from '@/features/owner/my-store/notices/ui/StoreNoticeDeleteCheckModal'



export function StoreNoticeCard({ shopId }: { shopId: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)


  // * 공지사항 있는거 가져오기
  const { data: storeNotices, isPending } = useGetNotices(shopId)
  // * 토글 용 (여기서는 is_show값만 바꾸는 용임)
  const { mutate: toggleNotice } = useSaveNotice()


  const { message } = App.useApp()

  const [selectedNotice, setSelectedNotice] = useState<NoticeType | null>(null)

  const openModal = (notice?: NoticeType) => {
    setSelectedNotice(notice ?? null)
    setIsModalOpen(true)
  }

  // * 공개용 토글
  const handleToggleShow = (item: NoticeType, checked: boolean) => {
    toggleNotice({
      shopId,
      noticeId: item.id,
      postData: {
        title: item.title,
        content: item.content,
        is_show: checked
      }
    }, {
      onSuccess: () => {
        message.success(checked ? '공지사항이 공개 됩니다.' : '공지사항이 숨김처리됩니다.')
      }
    })
  }

  // * 삭제 확인용 모달
  const openDeleteCheckModal = (noticeId: string) => {
    setDeleteTargetId(noticeId)
    setIsDeleteOpen(true)
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
                className={`group/item cursor-pointer rounded-2xl p-4 transition-all hover:bg-white hover:shadow-md border border-transparent hover:border-blue-100
                  ${item.is_show === false ? 'bg-gray-100/70 opacity-70' : 'bg-gray-50'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    {item.is_show === false ? <EyeOff size={14} className="text-gray-400" /> : <AlertCircle size={14} className="text-blue-400" />}
                    <h3 className="text-[14px] font-bold text-gray-800 line-clamp-1">{item.title}</h3>
                  </div>

                  <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                    <span className="text-[10px] text-gray-400 font-medium">{format(new Date(item.updated_at), 'MM.dd')}</span>
                    <Switch size="small" checked={item.is_show ?? true} onChange={(checked) => handleToggleShow(item, checked)} />

                    <button
                      className="text-gray-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                      onClick={() => openDeleteCheckModal(item.id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
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

      </article>

      <StoreNoticeModal
        shopId={shopId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedNotice={selectedNotice}
      />

      <StoreNoticeDeleteCheckModal
        shopId={shopId}
        noticeId={deleteTargetId}
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setDeleteTargetId(null);
        }}
      />
    </>
  )
}