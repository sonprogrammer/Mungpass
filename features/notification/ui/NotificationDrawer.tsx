'use client';

import { readAllNotifications } from '@/features/notification/api/readAllNotifications';
import { readNotification } from '@/features/notification/api/readNotification';
import { useDeleteAllNotifications } from '@/features/notification/model/useDeleteAllNotifications';
import { useDeleteNotification } from '@/features/notification/model/useDeleteNotification';
import { useNotificationStore } from '@/features/notification/model/useNotificationStore';
import { formatTime } from '@/shared/utils/formatDate';
import { App } from 'antd';
import { X, Clock, Calendar, Info, Trash2 } from 'lucide-react';


interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string
  shopId?: string
}

export default function NotificationDrawer({ isOpen, onClose, userId, shopId }: NotificationDrawerProps) {

  const { notifications, markAllAsRead, markAsRead } = useNotificationStore()
  const { mutate: deleteNoti } = useDeleteNotification()
  const { mutate: deleteAllNoti } = useDeleteAllNotifications()

  const { message, modal } = App.useApp()

  // *모든 알림 삭제
  const handleAllDeleteNoti = () => {
    const targetId = shopId || userId

    if (!targetId) {
      message.error('대상을 찾을 수 없습니다')
      return
    }

    modal.confirm({
      title: '전체 삭제',
      content: '모든 알림을 삭제 하시겠습니까?',
      cancelText: '취소',
      okText: '삭제',
      onOk: () => deleteAllNoti(targetId),
      okButtonProps: { danger: true },
      centered: true
    })
  }
  // * 알림 개별 삭제
  const handleDeleteNoti = (e: React.MouseEvent, notiId: string) => {
    e.stopPropagation()
    deleteNoti(notiId)
  }

  const handleAllRead = async () => {
    const unReadIds = notifications.filter(n => !n.is_read).map(n => n.id)
    if (unReadIds.length === 0) return

    const targetId = shopId || userId

    if (!targetId) {
      console.error('cant not find id')
      return
    }


    try {
      const res = await readAllNotifications(targetId)
      if (res.error) {
        throw res.error
      }
      markAllAsRead()
    } catch (error) {
      console.error('전체 읽음 처리 실패', error)
    }
  }

  const handleRead = async (notiId: string) => {
    try {
      const res = await readNotification(notiId)
      if (res.error) {
        throw res.error
      }
      markAsRead(notiId)
    } catch (error) {
      console.error('개별 읽음 처리 실패', error)
    }
  }

  if (!isOpen) return null


  const unreadCount = notifications.filter(n => !n.is_read).length

  return (

    <div className="fixed inset-0 z-1000 flex justify-center">

      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="relative w-full max-w-120 h-full pointer-events-none">


        <div className="absolute right-0 top-0 w-full max-w-[320px] h-full bg-white shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col rounded-l-[3rem] pointer-events-auto">


          <div className="p-8 pb-6 border-b border-orange-100">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                알림
                {unreadCount > 0 && (
                  <span className="text-sm bg-orange-500 text-white px-2 py-0.5 rounded-full font-bold transition-all">
                    {unreadCount}
                  </span>
                )}
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Mung-Pass Check service</p>
          </div>

          {/* //* 알림 리스트 */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
            {notifications.length > 0 ? (
              notifications.map((noti) => (
                <div
                  key={noti.id}
                  onClick={() => handleRead(noti.id)}
                  className={`relative p-5 rounded-4xl border transition-all active:scale-[0.98] cursor-pointer ${noti.is_read ? 'bg-white border-slate-100 opacity-60' : 'bg-orange-50/50 border-orange-100 shadow-sm'
                    }`}
                >

                  <button
                    onClick={(e) => handleDeleteNoti(e, noti.id)}
                    className="absolute bottom-4 right-4 p-2 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex justify-between items-start mb-2">
                    <div className={`p-2 rounded-xl ${noti.type.includes('checkin') ? 'bg-orange-100' :
                      noti.type.includes('checkout') ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                      {noti.type.includes('checkin') ? <Clock className="w-4 h-4 text-orange-600" /> :
                        noti.type.includes('checkout') ? <Clock className="w-4 h-4 text-green-600" /> :
                          <Calendar className="w-4 h-4 text-blue-600" />}
                    </div>
                    <span className="text-[10px] font-bold text-slate-700">{formatTime(noti.created_at)}</span>
                  </div>
                  <h4 className="text-sm font-black text-slate-800 mb-1">{noti.title}</h4>
                  <p className="text-[12px] font-medium text-slate-500 leading-relaxed">
                    {noti.message}
                  </p>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-300 space-y-2">
                <Info className="w-8 h-8 opacity-20" />
                <p className="text-xs font-bold">새로운 알림이 없습니다.</p>
              </div>
            )}
            <p className="text-[10px] text-center ">*본 알림은 최신순 최대 20개 알림입니다</p>
          </div>


          <div className="p-6 bg-slate-100 rounded-t-4xl">
            <div className="flex flex-col">
              <button
                onClick={handleAllRead}
                className="w-full cursor-pointer py-4 cursor-pointer bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-400 hover:text-orange-500 hover:border-orange-200 transition-all shadow-sm active:bg-orange-50"
              >
                모든 알림 읽음 처리
              </button>
              <button
                onClick={handleAllDeleteNoti}
                disabled={notifications.length === 0}
                className="flex items-center justify-center cursor-pointer gap-2 w-full py-3 text-[11px] font-bold text-slate-400 hover:text-red-400 transition-colors disabled:opacity-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
                전체 알림 삭제
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}