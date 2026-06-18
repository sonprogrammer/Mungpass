'use client'

import { Bell } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useUserStore } from "@/entities/user/model";
import { useNotificationStore, useRealTimeNotification } from "@/features/notification/model";
import { useGetInquiryUserNoti, useInquiryRealTimeNoti } from "@/entities/inquiry/model";
import { NotificationDrawer } from "@/features/notification/ui";

export default function Header() {
  const [isBellOpen, setIsBellOpen] = useState(false)
  const profile = useUserStore(state => state.profile)

  const userId = profile?.id

  useRealTimeNotification({ userId })
  useInquiryRealTimeNoti({ userId: userId as string, isAdmin: false})


  const notifications = useNotificationStore((state) => state.notifications)
  // * 1대1알림
    const { data: inquiryNoti} = useGetInquiryUserNoti(userId ?? '')
  const hasUnread = notifications.some(n => !n.is_read) || inquiryNoti?.some(n => !n.is_read)

  return (
    <>
      <header className={`
        px-6 py-4 flex justify-between items-center shadow-sm backdrop-blur-m bg-white/70 border-b border-orange-100/50
     `}>
        <Link href={'/home'} className="flex items-center gap-2 group">
          <div className={`
             group-active:scale-95 transition-all
          `}>
            <Image
              src="/m.png"
              alt="로고"
              width={50}
              height={50}
              className="rounded-xl bg-orange-50 border border-orange-100"
            />
          </div>

          <div className="flex flex-col -gap-1">
            <h1 className="text-xl font-black text-slate-900 tracking-tighter leading-none">
              멍 <span className="text-orange-500">패스</span>
            </h1>

          </div>
        </Link>

        <div className="flex items-center gap-3">

            {/* //TODO 수정 회원 등급임 추후 추가*/}
          {/* <div className="bg-orange-50 px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-orange-100">
            <Bone className="w-3.5 h-3.5 text-orange-500" />
            <span className="text-[10px] font-black text-orange-600 uppercase">Puppy Grade</span>
          </div> */}


          <button
            onClick={() => setIsBellOpen(true)}
            className={`
              relative p-2 rounded-full transition-all cursor-pointer text-slate-400 hover:bg-orange-50 hover:text-orange-500
            `} >
            <Bell className="w-5 h-5" />
            {/* //* 알림 배지 알림 있으면 주황점 있고 없으면 없게 */}
            {hasUnread && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse border-2 border-white" />
            )}
          </button>
        </div>
      </header>

      {userId && (
        <NotificationDrawer
          isOpen={isBellOpen}
          onClose={() => setIsBellOpen(false)}
          userId={userId}
        />
      )}
      
    </>

  );
}