'use client'

import { Bell, Store, Monitor } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import NotificationDrawer from '@/features/notification/ui/NotificationDrawer'
import { useGetShopInfo } from "@/entities/owner/model/useGetShopInfo";
import { useNotificationStore } from "@/features/notification/model/useNotificationStore";
import { useRouter } from "next/navigation";

export default function OwnerHeader() {
  const router = useRouter()
  const [isBellOpen, setIsBellOpen] = useState(false)

  const { data: shopInfo, isPending } = useGetShopInfo()
  const status = shopInfo?.status || 'none'
  const shopId = shopInfo?.id

  const notifications = useNotificationStore((state) => state.notifications)
  const hasUnread = notifications.some(n => !n.isRead)


  const STATUS_CONFIG = {
    pending: {
      container: "bg-blue-50 border-blue-100",
      dot: "bg-amber-500",
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
      label: shopInfo?.name
    },
    none: {
      container: "bg-slate-50 border-slate-100",
      dot: "bg-slate-400",
      text: "text-slate-600",
      label: "매장 등록 필요"
    }
  }

  const current = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG]

  return (
    <>
      <header className={`
        px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm backdrop-blur-md bg-slate-50/80 border-b border-emerald-100/50
      `}>
        <Link href={'/owner'} className="flex items-center gap-2 group">
          <div className={`
            p-1.5 rounded-xl group-active:scale-95 transition-all bg-emerald-600
          `}>
            <Store className="w-5 h-5 text-white" />
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
              onClick={() => router.push(`/kiosk/${shopId}`)}
              className="p-2 text-slate-400 cursor-pointer hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-all active:scale-95"
              title="키오스크 모드"
            >
              <Monitor className="w-5 h-5" />
            </button>
          )}

          <div className="bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100/50 flex items-center gap-2">
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
      <NotificationDrawer
        isOpen={isBellOpen}
        onClose={() => setIsBellOpen(false)}
      />
    </>

  );
}