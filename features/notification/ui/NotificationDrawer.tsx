'use client';

import { useGetInquiryUserNoti } from '@/entities/inquiry/model/useGetInquiryUserNoti';
import { deleteAllInquiryNoti } from '@/features/notification/api/deleteAllInquiryNoti';
import { readAllNotifications } from '@/features/notification/api/readAllNotifications';
import { readInquiryNoti } from '@/features/notification/api/readInquiryNoti';
import { readNotification } from '@/features/notification/api/readNotification';
import { useDeleteAllNotifications } from '@/features/notification/model/useDeleteAllNotifications';
import { useDeleteInquiryNoti } from '@/features/notification/model/useDeleteInquiryNoti';
import { useDeleteNotification } from '@/features/notification/model/useDeleteNotification';
import { useNotificationStore } from '@/features/notification/model/useNotificationStore';
import { formatTime } from '@/shared/utils/formatDate';
import { App } from 'antd';
import { X, Clock, Calendar, Info, Trash2 } from 'lucide-react';

// ! 이건 일반 유저, 사장용 컴포넌트임. 관리자용은 따로 만들어주기
interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string //일반 유저 알림창일때
  shopId?: string // 사장 유저 알림창일 때
}

interface UnifiedNotification {
  id: string;
  origin: 'check' | 'inquiry';
  type: 'checkin' | 'checkout' | 'info' | 'inquiry_new_req' | 'inquiry_res';
  title: string;
  message: string;
  time: string;       
  is_read: boolean;
  created_at: string;
}

export default function NotificationDrawer({ isOpen, onClose, userId, shopId }: NotificationDrawerProps) {

  // * 체크인 체크아웃알림
  const { notifications, markAllAsRead, markAsRead } = useNotificationStore()
  //* 1대1 채팅문의 알림
  const { data =[]} = useGetInquiryUserNoti(userId)
  const unreadInquiryNoti = data.filter(n => !n.is_read)
  
  // * 체크인 체크아웃 삭제
  const { mutate: deleteNoti } = useDeleteNotification()
  const { mutate: deleteAllNoti } = useDeleteAllNotifications()
  // * 1대1알림 삭제
  const {mutate: deleteInquiryNoti} = useDeleteInquiryNoti(userId)


  const { message, modal } = App.useApp()

  const AllNotifications: UnifiedNotification[] = [
    ...notifications.map(n => ({ ...n,origin: 'check' as const})),
    ...unreadInquiryNoti.map(n => ({
      id: n.id,
      origin: 'inquiry' as const,
      type: n.type,
      title: n.title,
      message: n.message,
      time: formatTime(n.created_at),
      is_read: n.is_read,
      created_at: n.created_at
    }))
  ].sort((a, b) => b.created_at.localeCompare(a.created_at)) as UnifiedNotification[]

  //* 안읽은 알림수
  const totalUnreadCount = notifications.filter(n => !n.is_read).length +
                          unreadInquiryNoti.length
  
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
      onOk: async() => {
        deleteAllNoti(targetId)
        await deleteAllInquiryNoti(targetId)
        message.success('모든 문의 알림이 삭제되었습니다.')
      },
      okButtonProps: { danger: true },
      centered: true
    })
  }

  // * 알림 개별 삭제
  const handleDeleteNoti = async(e: React.MouseEvent, noti: UnifiedNotification) => {
    e.stopPropagation()
    if(noti.origin ==='check'){
      deleteNoti(noti.id)
    }else{
      deleteInquiryNoti(noti.id)

    }
  }

  const handleAllRead = async () => {
    const unReadIds = AllNotifications.filter(n => !n.is_read).map(n => n.id)
    if (unReadIds.length === 0) return

    const targetId = shopId || userId

    if (!targetId) {
      console.error('cant not find id')
      return
    }


    try {
      await readAllNotifications(targetId)
      
      markAllAsRead()
    } catch (error) {
      console.error('전체 읽음 처리 실패', error)
    }
  }

  const handleRead = async (noti: UnifiedNotification) => {
    if(noti.origin === 'check'){
      markAsRead(noti.id)
    }else{ //TODO 여기서는 해당 채팅방이 열려야하는데 동시에 채팅방이 열리면 해당 roomId로 된 알림내역은 is_read: true가되어서 알림창에는 안보여야하고
      // inquiryRead(noti.id)
    }
    try {
      if(!noti.is_read){
        if(noti.origin === 'check'){
          await readNotification(noti.id)
        }else{
          //TODO 여기서는 해당 채팅방이 열려야하는데 동시에 채팅방이 열리면 해당 roomId로 된 알림내역은 is_read: true가되어서 알림창에는 안보여야하고
          await readInquiryNoti(noti.id)
        }
      }
    } catch (error) {
      console.error('개별 읽음 처리 실패', error)
    }
  }

  if (!isOpen) return null



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
                {totalUnreadCount > 0 && (
                  <span className="text-sm bg-orange-500 text-white px-2 py-0.5 rounded-full font-bold transition-all">
                    {totalUnreadCount}
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
            {AllNotifications.length > 0 ? (
              AllNotifications.map((noti) => (
                <div
                  key={noti.id}
                  onClick={() => handleRead(noti)}
                  className={`relative p-5 rounded-4xl border transition-all active:scale-[0.98] cursor-pointer ${noti.is_read ? 'bg-white border-slate-100 opacity-60' : 'bg-orange-50/50 border-orange-100 shadow-sm'
                    }`}
                >

                  <button
                    onClick={(e) => handleDeleteNoti(e, noti)}
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
                className="w-full cursor-pointer py-4 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-400 hover:text-orange-500 hover:border-orange-200 transition-all shadow-sm active:bg-orange-50"
              >
                모든 알림 읽음 처리
              </button>

              {notifications.length > 0 && (
                <button
                  onClick={handleAllDeleteNoti}
                  disabled={notifications.length === 0}
                  className="flex items-center justify-center cursor-pointer gap-2 w-full py-3 text-[11px] font-bold text-slate-400 hover:text-red-400 transition-colors disabled:opacity-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  전체 알림 삭제
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}