'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  QrCode, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  History,
  Gift,
  Dog,
  Clock,
  Bell,
  CheckCircle2,
  PartyPopper,
  Info,
  Footprints
} from 'lucide-react';
import QrScannerModal from '@/app/components/QrScannerModal'; // 경로 확인 필요

export default function HomePage() {
  const router = useRouter();
  
  // 유저 및 강아지 데이터 (실제로는 Supabase에서 fetch)
  const [userData, setUserData] = useState({
    name: "홍길동",
    myCoupons: 2,         // 보유 혜택권
    visitCount: 12,       // 총 방문 횟수
  });

  // 등록된 강아지 정보 (회원가입 후 등록했을 데이터)
  const [myDog, setMyDog] = useState({
    name: "초코",
    breed: "푸들",
    status: "집에서 쉬는 중", // '이용 중'일 때 타이머 작동 로직 가능
  });

  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // QR 스캔 성공 시 (입실 로직)
  const handleScanSuccess = (data: string) => {
    setIsScannerOpen(false);
    
    // TODO: 실제로는 API를 호출하여 해당 시설 입실 처리 및 타이머 시작
    setUserData(prev => ({
      ...prev,
      mileage: prev.mileage + 500, // 방문 적립
      currentAttendance: prev.currentAttendance + 1
    }));
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FFFBEB] pb-24 font-sans">
     

      <main className="p-6 max-w-md mx-auto space-y-6">
        
    
        <section className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{userData.name}님, 반가워요!</h2>
            <p className="text-orange-400 text-sm font-medium flex items-center gap-1 mt-1">
              {myDog.name}는 지금 <span className="underline decoration-2">{myDog.status}</span>
            </p>
          </div>
          <div className="w-16 h-16 bg-orange-200 rounded-3xl overflow-hidden border-4 border-white shadow-md">
             {/* 실제 강아지 사진이 들어갈 자리 */}
             <div className="w-full h-full flex items-center justify-center bg-orange-100 text-orange-500">
                <Dog className="w-8 h-8" />
             </div>
          </div>
        </section>

        {/* 멤버십 등급 */}
        <section className="bg-white rounded-[2.5rem] p-6 shadow-xl shadow-orange-200/10 border border-orange-50 relative overflow-hidden">
          {/* 장식용 배경 */}
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-orange-50 rounded-full opacity-50" />
          
          <div className="relative z-10">
            <p className="text-[11px] text-slate-400 font-black uppercase tracking-tighter mb-1">나의 멍패스 현황</p>
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-800 tracking-tight">사용 가능한 혜택 <span className="text-orange-500">{userData.myCoupons}</span>개</h3>
                <p className="text-xs text-slate-400 font-medium">이번 달 총 {userData.visitCount}번 산책했어요!</p>
              </div>
              <button 
                onClick={() => router.push('/benefits')}
                className="bg-slate-900 text-white text-[10px] font-black px-4 py-2 rounded-xl active:scale-95 transition-all"
              >
                전체보기
              </button>
            </div>
          </div>
        </section>

        {/* QR  */}
        <button 
          onClick={() => setIsScannerOpen(true)}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white p-6 rounded-[2.5rem] shadow-2xl flex items-center justify-between group transition-all active:scale-95"
        >
          <div className="flex items-center gap-4">
            <div className="bg-orange-500 p-4 rounded-3xl group-hover:rotate-12 transition-transform shadow-lg shadow-orange-500/30">
              <QrCode className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <p className="font-extrabold text-lg tracking-tight">지금 입실하기</p>
              <p className="text-white/50 text-xs">QR 스캔으로 이용권을 시작하세요</p>
            </div>
          </div>
          <ChevronRight className="w-6 h-6 text-white/30" />
        </button>

      
        <div className="grid grid-cols-2 gap-4">
          <div onClick={() => router.push('/history')} className="bg-white p-5 rounded-4xl border border-orange-50 shadow-sm hover:shadow-md transition-all cursor-pointer">
            <div className="bg-orange-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
              <History className="w-6 h-6 text-orange-500" />
            </div>
            <p className="font-bold text-slate-800">멍패스 기록</p>
            <p className="text-[10px] text-slate-400 mt-1">우리 아이 이용 내역</p>
          </div>
          <div onClick={() => router.push('/benefits')} className="bg-white p-5 rounded-4xl border border-orange-50 shadow-sm hover:shadow-md transition-all cursor-pointer">
            <div className="bg-yellow-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
              <Gift className="w-6 h-6 text-yellow-500" />
            </div>
            <p className="font-bold text-slate-800">멤버십 혜택</p>
            <p className="text-[10px] text-slate-400 mt-1">쿠폰 및 등급별 보상</p>
          </div>
        </div>

        {/* 주변 애견카페  */}
        <section className="space-y-4 pb-10">
          <div className="flex justify-between items-center">
            <h3 className="font-extrabold text-slate-800 flex items-center gap-2">
              주변 멍패스 존 <MapPin className="w-4 h-4 text-orange-500" />
            </h3>
            {/* 클릭시 주변 찾기페이지로 넘어감 */}
            <button className="text-[11px] text-orange-500 font-bold bg-orange-50 px-3 py-1 rounded-full">전체보기</button>
          </div>
          
          <div className="bg-white p-4 rounded-4xl border border-orange-50 shadow-sm flex gap-4 items-center relative overflow-hidden group">
            <div className="w-20 h-20 bg-slate-100 rounded-2xl overflow-hidden shrink-0">
               <div className="w-full h-full bg-orange-100 flex items-center justify-center">
                  <span className="text-2xl">☕</span>
               </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="bg-green-100 text-green-600 text-[9px] font-black px-2 py-0.5 rounded-md uppercase">여유</span>
                <p className="text-[10px] font-bold text-orange-500">CAFE</p>
              </div>
              <h4 className="font-extrabold text-slate-800 text-sm tracking-tight">멍멍 브루어리 성수</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">현재 3마리의 친구가 있어요!</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:translate-x-1 transition-transform" />
          </div>
        </section>
      </main>

      {/* QR성공시, //TODO 퇴실 한시간전 알림 추가 */}
      {showSuccess && (
        <div className="fixed inset-0 z-2000 flex items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
          <div className="absolute inset-0 bg-orange-500/90 backdrop-blur-xl" />
          <div className="relative bg-white rounded-[3rem] p-10 w-full max-w-xs text-center shadow-2xl border-4 border-orange-100">
            <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 relative">
              <CheckCircle2 className="w-14 h-14 text-orange-500 animate-bounce" />
              <PartyPopper className="absolute -right-2 -top-2 w-8 h-8 text-yellow-400 rotate-12" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">입실 완료!</h2>
            <p className="text-slate-500 font-medium mb-6 text-sm">
              사장님께 초코의 정보를<br/>안전하게 전달했어요. 🐾
            </p>
            <div className="flex items-center justify-center gap-2 text-orange-600 font-black bg-orange-50 py-4 rounded-3xl">
              <Clock className="w-5 h-5" />
              <span>이용 시간 측정 시작</span>
            </div>
          </div>
        </div>
      )}

      {/* 스캐너 모달 연결 */}
      {isScannerOpen && (
        <QrScannerModal 
          onClose={() => setIsScannerOpen(false)} 
          onScanSuccess={handleScanSuccess} 
        />
      )}
    </div>
  );
}