'use client';

import React from 'react';
import {
  Settings,
  LogOut,
  ChevronRight,
  Dog,
  Ticket,
  Heart,
  Bell,
  MessageCircle,
  Clock,
  CircleHelp
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ProfileCard } from '@/entities/user/ui/ProfileCard';
import { UserStats } from '@/widgets/mypage/ui/UserStats';
import { MyPageMenu } from '@/widgets/mypage/ui/MyPageMenu';
import { MyPageFooter } from '@/widgets/mypage/ui/MyPageFooter';

export default function MyPage() {
  const router = useRouter();

  // 목업 데이터
  const user = {
    name: "홍길동",
    email: "example@mungpass.com",
    myDog: "초코",
    couponCount: 22,
    totalVisits: 12,
    joinDate: "2026.01.05"
  };

  return (
    <div className="min-h-screen bg-[#FFFBEB] pb-24">
      {/* //* 🟠 프로필 섹션 (오렌지 테마) */}
      <section className="bg-white px-6 pt-12 pb-8 rounded-b-[3.5rem] shadow-sm border-b border-orange-50">
        <div className="flex items-center justify-between mb-8">
          {/* ProfileCard */}
          <ProfileCard user={user} />
          {/*  */}

          <button className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-slate-600 transition-colors">
            <Settings className="w-5 h-5" />
          </button>


        </div>

        {/* //* 활동 요약  */}
        <UserStats user={user} />
      </section>

      {/* //*  메뉴 리스트 */}
      <main className="p-6 space-y-8">
        {/* 내 활동 섹션 == MyPageMenu*/}
        <MyPageMenu />


        {/* //* 하단 로그아웃 */}
        <MyPageFooter user={user} />
      </main>
    </div>
  );
}

