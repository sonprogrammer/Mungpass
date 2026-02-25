'use client';

import React from 'react';
import {
  Settings
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ProfileCard } from '@/entities/user/ui/ProfileCard';
import { UserStats } from '@/widgets/mypage/ui/UserStats';
import { MyPageMenu } from '@/widgets/mypage/ui/MyPageMenu';
import { MyPageFooter } from '@/widgets/mypage/ui/MyPageFooter';
import { useUserStore } from '@/entities/user/model/useUserStore';

export default function MyPage() {
  const router = useRouter();
  const profile = useUserStore(state => state.profile)


  return (
    <div className="h-screen bg-[#FFFBEB] pb-24">
      {/* //* 🟠 프로필 섹션 (오렌지 테마) */}
      <section className="bg-white px-6 pt-12 pb-8 rounded-b-[3.5rem] shadow-sm border-b border-orange-50">
        <div className="flex items-center justify-between ">
          {/* ProfileCard */}
          <ProfileCard user={profile} />
          {/*  */}

          <button className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-slate-600 transition-colors">
            <Settings className="w-5 h-5" />
          </button>


        </div>

        {/* //* 활동 요약  --> 쿠폰이랑 활동요약이라 나중에 추가해주는게 좋음*/}
        {/* <UserStats user={profile} /> */}
      </section>

      {/* //*  메뉴 리스트 */}
      <main className="p-6 space-y-8">
        {/* 내 활동 섹션 == MyPageMenu*/}
        <MyPageMenu />


        {/* //* 하단 로그아웃 */}
        <MyPageFooter user={profile} />
      </main>
    </div>
  );
}

