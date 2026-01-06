'use client';

import React from 'react';
import { 
  Settings, 
  LogOut, 
  ChevronRight, 
  Award, 
  ShieldCheck, 
  CreditCard, 
  Bell, 
  MessageCircle 
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MyPage() {
  const router = useRouter();

  // 목업
  const user = {
    name: "홍길동",
    email: "example@plan-a.com",
    grade: "D",
    mileage: 500,
    joinDate: "2026.01.05"
  };

  const handleLogout = () => {
    // TODO Supabase signOut 로직
    if (confirm("로그아웃 하시겠습니까?")) {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* //* 상단 프로필 섹션 */}
      <section className="bg-white px-6 pt-10 pb-8 rounded-b-[40px] shadow-sm border-b border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-blue-200">
              {user.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{user.name} 님</h2>
              <p className="text-sm text-slate-400 font-medium">{user.email}</p>
            </div>
          </div>
          <button className="p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-slate-600 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* //* 등급 및 포인트 카드 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-900 p-4 rounded-2xl text-white">
            <p className="text-[10px] text-white/50 font-bold uppercase mb-1">현재 등급</p>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-400" />
              <span className="text-lg font-black tracking-tight">GRADE {user.grade}</span>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100/50">
            <p className="text-[10px] text-blue-400 font-bold uppercase mb-1">보유 마일리지</p>
            <div className="flex items-center gap-1">
              <span className="text-lg font-black text-blue-600">{user.mileage.toLocaleString()}</span>
              <span className="text-xs font-bold text-blue-400 ml-0.5">P</span>
            </div>
          </div>
        </div>
      </section>

      {/* //* 메뉴 리스트 */}
      <main className="p-6 space-y-6">
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase ml-1 mb-3">내 활동 관리</h3>
          
          <MenuItem icon={<ShieldCheck className="w-5 h-5 text-indigo-500" />} title="등급 혜택 확인" />
          <MenuItem icon={<CreditCard className="w-5 h-5 text-emerald-500" />} title="참여 및 포인트 내역" />
          <MenuItem icon={<Bell className="w-5 h-5 text-amber-500" />} title="알림 설정" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase ml-1 mb-3">고객지원</h3>
          <MenuItem icon={<MessageCircle className="w-5 h-5 text-slate-500" />} title="1:1 문의하기" />
          <MenuItem icon={<Info className="w-5 h-5 text-slate-500" />} title="약관 및 개인정보 처리방침" />
        </div>

        {/* //* 로그아웃 버튼 */}
        <button 
          onClick={handleLogout}
          className="w-full py-4 flex items-center justify-center gap-2 text-slate-400 font-bold text-sm hover:text-red-500 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          로그아웃
        </button>

        <p className="text-center text-[10px] text-slate-300">
          가입일: {user.joinDate} | Plan ALLIANCE Membership
        </p>
      </main>
    </div>
  );
}

//* 메뉴 아이템 
function MenuItem({ icon, title }: { icon: React.ReactNode, title: string }) {
  return (
    <button className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm active:scale-[0.98] transition-all">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-slate-50 rounded-xl">
          {icon}
        </div>
        <span className="text-sm font-bold text-slate-700">{title}</span>
      </div>
      <ChevronRight className="w-4 h-4 text-slate-300" />
    </button>
  );
}

function Info({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
    </svg>
  );
}