'use client'

import { Bone, Bell, Store } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import NotificationDrawer from '@/features/notification/ui/NotificationDrawer'
import { useUserStore } from "@/entities/user/model/useUserStore";
import { useGetShopInfo } from "@/entities/owner/model/useGetShopInfo";

export default function Header() {
  const profile = useUserStore(state => state.profile)
  const [isBellOpen, setIsBellOpen] = useState(false)

  const { data: shopInfo, isPending } = useGetShopInfo()
  console.log('data from header', shopInfo)

  const isOwner = profile?.role === 'owner'
  return (
    <>
      <header className={`
        px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm backdrop-blur-md
        ${isOwner
          ? "bg-slate-50/80 border-b border-emerald-100/50"
          : "bg-white/70 border-b border-orange-100/50"
        }
      `}>
        <Link href={isOwner ? '/owner' : '/home'} className="flex items-center gap-2 group">
          <div className={`
            p-1.5 rounded-xl group-active:scale-95 transition-all
            ${isOwner ? "bg-emerald-600" : "bg-orange-500"}
          `}>
            {isOwner ? (
              <Store className="w-5 h-5 text-white" />
            ) : (
              <Bone className="w-5 h-5 text-white rotate-45" />
            )}
          </div>

          <div className="flex flex-col -gap-1">
            <h1 className="text-xl font-black text-slate-900 tracking-tighter leading-none">
              멍 <span className={isOwner ? "text-emerald-600" : "text-orange-500"}>패스</span>
            </h1>
            {isOwner && (
              <span className="text-[9px] font-black text-emerald-600/70 tracking-widest uppercase ml-0.5">
                Partner
              </span>
            )}
          </div>
        </Link>

        <div className="flex items-center gap-3">
          {!isOwner ? (
            <div className="bg-orange-50 px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-orange-100">
              <Bone className="w-3.5 h-3.5 text-orange-500" />
              {/* //TODO 수정 회원 등급임 */}
              <span className="text-[10px] font-black text-orange-600 uppercase">Puppy Grade</span>
            </div>
          ) : (
            <div className="bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100/50 flex items-center gap-2">
              {isPending ? (
                <div className="w-16 h-3 bg-emerald-200 animate-pulse rounded" />
              ) : (
                <>
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[12px] font-black text-emerald-700 uppercase">
                    {shopInfo?.name ?? "매장 등록 필요"}
                  </span>
                </>
              )}
            </div>
          )}

          <button
            onClick={() => setIsBellOpen(true)}
            className={`
              relative p-2 rounded-full transition-all cursor-pointer
              ${isOwner
                ? "text-slate-500 hover:bg-emerald-50 hover:text-emerald-600"
                : "text-slate-400 hover:bg-orange-50 hover:text-orange-500"
              }
            `}          >
            <Bell className="w-5 h-5" />
            {/* //* 알림 배지 알림 있으면 주황점 있고 없으면 없게 */}
            <span className="absolute top-1 right-1.5 w-3 h-3 bg-red-500 rounded-full animate-pulse border-2 border-white"></span>
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