'use client'

import { Bone, Bell } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import NotificationDrawer from '@/features/notification/ui/NotificationDrawer'

export default function Header() {
  const [isBellOpen, setIsBellOpen] = useState(false);
  return (
    <>
      <header className="bg-white/70 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-orange-100/50 sticky top-0 z-50 shadow-sm">
        <Link href='/home' className="flex items-center gap-2 group">
          <div className="bg-orange-500 p-1.5 rounded-xl group-active:scale-95 transition-transform">
            <Bone className="w-5 h-5 text-white rotate-45" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tighter">
            멍 <span className="text-orange-500">패스</span>
          </h1>
        </Link>

        <div className="flex items-center gap-3">
          <div className="bg-orange-50 px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-orange-100">
            <Bone className="w-3.5 h-3.5 text-orange-500" />
            <span className="text-[10px] font-black text-orange-600 uppercase">Puppy Grade</span>
          </div>
          <button
            onClick={() => setIsBellOpen(true)}
            className="relative text-slate-400 p-2 hover:bg-orange-50 hover:text-orange-500 rounded-full transition-all cursor-pointer"
          >
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