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

export default function MyPage() {
  const router = useRouter();

  // 목업 데이터
  const user = {
    name: "홍길동",
    email: "example@mungpass.com",
    myDog: "초코",
    couponCount: 2,
    totalVisits: 12,
    joinDate: "2026.01.05"
  };

  const handleLogout = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBEB] pb-24">
      {/* //* 🟠 프로필 섹션 (오렌지 테마) */}
      <section className="bg-white px-6 pt-12 pb-8 rounded-b-[3.5rem] shadow-sm border-b border-orange-50">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {/* 프로필 이미지  */}
            <div className="w-16 h-16 bg-orange-500 rounded-3xl flex items-center justify-center text-white shadow-lg shadow-orange-200">
              <Dog className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <h2 className="text-xl font-black text-slate-900">{user.name} 님</h2>
                <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-lg font-black">{user.myDog} 아빠</span>
              </div>
              <p className="text-sm text-slate-400 font-medium">{user.email}</p>
            </div>
          </div>
          <button className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-slate-600 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* //* 활동 요약  */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-900 p-5 rounded-4xl text-white shadow-xl shadow-slate-200">
            <p className="text-[10px] text-white/50 font-black uppercase mb-1 tracking-tighter">보유 혜택권</p>
            <div className="flex items-center gap-2">
              <Ticket className="w-5 h-5 text-orange-400" />
              <span className="text-xl font-black tracking-tight">{user.couponCount}장</span>
            </div>
          </div>
          <div className="bg-orange-50 p-5 rounded-4xl border border-orange-100">
            <p className="text-[10px] text-orange-400 font-black uppercase mb-1 tracking-tighter">함께한 산책</p>
            <div className="flex items-center gap-1">
              <span className="text-xl font-black text-orange-600">{user.totalVisits}</span>
              <span className="text-sm font-black text-orange-400">회</span>
            </div>
          </div>
        </div>
      </section>

      {/* //*  메뉴 리스트 */}
      <main className="p-6 space-y-8">
        {/* 내 활동 섹션 */}
        <div className="space-y-3">
          <h3 className="text-[11px] font-black text-slate-400 uppercase ml-2 tracking-widest">나의 멍생활</h3>
          <div className="space-y-2">
            <MenuItem icon={<Heart className="w-5 h-5 text-pink-500" />} title="단골 멍패스 샵" />
            <MenuItem icon={<Clock className="w-5 h-5 text-blue-500" />} title="이용 내역 확인" />
            <MenuItem icon={<Bell className="w-5 h-5 text-orange-500" />} title="알림 설정" />
          </div>
        </div>

        {/* 앱내 서비스 섹션 */}
        <div className="space-y-3">
          <h3 className="text-[11px] font-black text-slate-400 uppercase ml-2 tracking-widest">서비스 안내</h3>
          <div className="space-y-2">
            <MenuItem icon={<MessageCircle className="w-5 h-5 text-slate-400" />} title="1:1 채팅 문의" />
            <MenuItem icon={<CircleHelp className="w-5 h-5 text-slate-400" />} title="자주 묻는 질문" />
          </div>
        </div>

        {/* //* 하단 로그아웃 */}
        <div className="pt-4 flex flex-col items-center gap-4">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-slate-400 font-black text-sm hover:text-red-500 transition-colors py-2 px-6 rounded-full border border-slate-200"
          >
            <LogOut className="w-4 h-4" />
            로그아웃
          </button>
          <p className="text-[10px] text-slate-300 font-bold">
            가입일: {user.joinDate} | 멍패스(MungPass) 
          </p>
        </div>
      </main>
    </div>
  );
}

//* 🛠️ 메뉴 아이템 컴포넌트 (UI 통일)
function MenuItem({ icon, title }: { icon: React.ReactNode, title: string }) {
  return (
    <button className="w-full flex items-center justify-between p-5 bg-white rounded-[1.8rem] border border-orange-50/50 shadow-sm active:scale-[0.98] transition-all">
      <div className="flex items-center gap-4">
        <div className="p-2.5 bg-slate-50 rounded-2xl">
          {icon}
        </div>
        <span className="text-[15px] font-black text-slate-700 tracking-tight">{title}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-slate-300" />
    </button>
  );
}