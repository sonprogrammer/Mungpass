'use client'

import { Bell, Monitor } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import NotificationDrawer from '@/features/notification/ui/NotificationDrawer'
import { useNotificationStore } from "@/features/notification/model/useNotificationStore";
import { useRouter } from "next/navigation";
import { useRealTimeNotification } from "@/features/notification/model/useRealTimeNotification";
import { useGetOwnerHasStoreStatus } from "@/features/owner/model/useGetOwnerHasStoreStatus";
import Image from "next/image";
import { useInquiryRealTimeNoti } from "@/entities/inquiry/model/useInquiryRealTimeNoti";
import { useUserStore } from "@/entities/user/model/useUserStore";
import { useGetInquiryUserNoti } from "@/entities/inquiry/model/useGetInquiryUserNoti";


export default function OwnerHeader() {
  const router = useRouter()
  const [isBellOpen, setIsBellOpen] = useState(false)

  const { data: storeStatusInfo, isPending } = useGetOwnerHasStoreStatus()

  const origin = storeStatusInfo?.origin
  const isVerifiedShop = origin === 'shops'
  const profile = useUserStore(state => state.profile)
  const userId = profile?.id

  const shopId = isVerifiedShop ? storeStatusInfo?.id : null
  const shopName = storeStatusInfo?.name || '확인 중'
  const status = storeStatusInfo?.status

  useRealTimeNotification({ shopId })
  useInquiryRealTimeNoti({ userId: userId as string, isAdmin: false})


  // * 체크 인아웃 알림
  const notifications = useNotificationStore((state) => state.notifications)
  // * 1대1알림
  const { data: inquiryNoti} = useGetInquiryUserNoti(userId ?? '')

  const hasUnread = notifications.some(n => !n.is_read) || inquiryNoti?.some(n => !n.is_read)


  const STATUS_CONFIG = {
    pending: {
      container: "bg-blue-50 border-blue-100",
      dot: "bg-blue-500",
      text: "text-blue-700",
      label: "심사 대기 중"
    },
    rejected: {
      container: "bg-red-50 border-red-100",
      dot: "bg-red-500",
      text: "text-red-700",
      label: "심사 반려 (관리자문의 필요)"
    },
    verified: {
      container: "bg-emerald-50 border-emerald-100/50",
      dot: "bg-emerald-500",
      text: "text-emerald-700",
      label: shopName
    },
    none: {
      container: "bg-slate-50 border-slate-100",
      dot: "bg-slate-400",
      text: "text-slate-600",
      label: "매장 등록 필요"
    }
  }

  const current = STATUS_CONFIG[(!storeStatusInfo ? 'none' : storeStatusInfo.status) as keyof typeof STATUS_CONFIG]

  const handleStartKiosk = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen()
    }
    router.replace(`/kiosk/${shopId}`)
  }
  return (
    <>
      <header className={`
        px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm backdrop-blur-md bg-slate-50/80 border-b border-emerald-100/50
      `}>
        <Link href={'/owner'} className="flex items-center gap-2 group">
          <div className={`
             group-active:scale-95 transition-all
          `}>
            <Image
              src="/o.png"
              alt="로고"
              width={50}
              height={50}
              className="rounded-xl bg-emerald-50 border border-emerald-100"
            />
          </div>

          <div className="flex flex-col -gap-1">
            <h1 className="text-xl font-black text-slate-900 tracking-tighter leading-none">
              멍 <span className="text-emerald-600">패스</span>
            </h1>
            <span className="text-[9px] font-black text-emerald-600/70 tracking-widest uppercase ml-0.5">
              Partner
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">

          {!isPending && status === 'verified' && (
            <button
              onClick={() => handleStartKiosk()}
              className="p-2 text-slate-400 cursor-pointer hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-all active:scale-95"
              title="키오스크 모드"
            >
              <Monitor className="w-5 h-5" />
            </button>
          )}

          <div className={`px-3 py-1.5 rounded-full border flex items-center gap-2 ${current.container}`}>
            {isPending ? (
              <div className="w-16 h-3 bg-emerald-200 animate-pulse rounded" />
            ) : (
              <>
                <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${current.dot}`} />
                <span className={`text-[12px] font-black uppercase ${current.text}`}>
                  {current.label}
                </span>
              </>
            )}
          </div>


          <button
            onClick={() => setIsBellOpen(true)}
            className={`
              relative p-2 rounded-full transition-all cursor-pointer text-slate-500 hover:bg-emerald-50 hover:text-emerald-600
            `}          >
            <Bell className="w-5 h-5" />
            {hasUnread && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse border-2 border-white" />
            )}
          </button>
        </div>
      </header>

      {/* //* 매장 승인 후 이용 가능  */}
      {shopId && userId && (
        <NotificationDrawer
          isOpen={isBellOpen}
          onClose={() => setIsBellOpen(false)}
          shopId={shopId}
          userId={userId}
        />
      )}


    </>

  );
}