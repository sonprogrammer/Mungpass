'use client'

import { Bell, Store } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import NotificationDrawer from '@/features/notification/ui/NotificationDrawer'
import { useUserStore } from "@/entities/user/model/useUserStore";
import { useGetShopInfo } from "@/entities/owner/model/useGetShopInfo";

export default function OwnerHeader() {
  const profile = useUserStore(state => state.profile)
  const [isBellOpen, setIsBellOpen] = useState(false)

  const { data: shopInfo, isPending } = useGetShopInfo()

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
          
            <div className="bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100/50 flex items-center gap-2">
              {isPending ? (
                <div className="w-16 h-3 bg-emerald-200 animate-pulse rounded" />
              ) : (
                <>
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[12px] font-black text-emerald-700 uppercase">
                    {/* //TODO 여기는 제출서류 완료 한상태이면 심사 대기중이라고 뜨기 */}
                    {/* //TODO 여기는 심사 성공하고 가게문 닫은 상태면 잠자는 모양으로 해놓기 아님 이거를 스위치로 만들어서 관리하던가 */}
                    {shopInfo?.name ?? "매장 등록 필요"}
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