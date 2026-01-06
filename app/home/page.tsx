'use client';
import React, { useState } from 'react';
import { 
  QrCode, 
  Trophy, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  History,
  Gift
} from 'lucide-react';
import { CheckCircle2, PartyPopper } from 'lucide-react';
import QrModal from '@/app/components/QrModal'
import QrScannerModal from '@/app/components/QrScannerModal'

export default function HomePage() {
  // TODO실제로는 DB에서 가져올 임시 데이터
  const [userData, setUserData] = useState({
    name: "홍길동",
    grade: "D",
    currentAttendance: 1,
    nextGradeGoal: 2,
    mileage: 500,
  })

  const progressPercentage = (userData.currentAttendance / 7) * 100; // A등급(7회) 기준
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
 
  
  const handleScanSuccess = (data: string) => {
    setIsScannerOpen(false);
    
    // 여기서 data(QR 내용)를 분석해서 마일리지 적립 API 호출
    // console.log("스캔된 QR 데이터:", data)
    // alert(`인증 완료! 데이터: ${data}`)
    setUserData(prev => ({
        ...prev,
        mileage: prev.mileage + 100, // 100포인트 추가
        currentAttendance: prev.currentAttendance + 1
      }));
      
      setShowSuccess(true);
      
      // 3초 뒤 성공 메시지 닫기
      setTimeout(() => setShowSuccess(false), 3000);
  };
  
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
     

      <main className="p-6 max-w-md mx-auto space-y-6">

        <section>
          <h2 className="text-2xl font-bold text-slate-800">안녕하세요, {userData.name}님!</h2>
          <p className="text-slate-500 text-sm mt-1">오늘도 새로운 프로그램에 참여해보세요.</p>
        </section>

        {/* //*등급  */}
        <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Current Status</p>
              <h3 className="text-lg font-bold text-slate-800">다음 등급(C)까지 {userData.nextGradeGoal - userData.currentAttendance}회 남음</h3>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-blue-600">{userData.mileage}</span>
              <span className="text-sm font-medium text-slate-400 ml-1">P</span>
            </div>
          </div>
          
          {/* //*프로그레스 바 */}
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-2">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-1000"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
            <span>Grade D</span>
            <span>Grade A</span>
          </div>
        </section>
        

        {/* //* QR*/}
        <button 
            onClick={() => setIsScannerOpen(true)}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white p-5 rounded-3xl shadow-xl flex items-center justify-between group transition-all">
          <div className="flex items-center gap-4">
            <div className="bg-white/10 p-3 rounded-2xl group-hover:scale-110 transition-transform">
              <QrCode className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <p className="font-bold text-lg">오프라인 출석 인증</p>
              <p className="text-white/60 text-xs">특정 장소 QR 코드를 스캔하세요</p>
            </div>
          </div>
          <ChevronRight className="w-6 h-6 text-white/40" />
        </button>

      
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
            <div className="bg-indigo-50 w-10 h-10 rounded-2xl flex items-center justify-center mb-3">
              <History className="w-5 h-5 text-indigo-600" />
            </div>
            <p className="font-bold text-slate-800">참여 내역</p>
            <p className="text-[11px] text-slate-400 mt-1">지금까지의 활동 확인</p>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
            <div className="bg-amber-50 w-10 h-10 rounded-2xl flex items-center justify-center mb-3">
              <Gift className="w-5 h-5 text-amber-600" />
            </div>
            <p className="font-bold text-slate-800">등급별 혜택</p>
            <p className="text-[11px] text-slate-400 mt-1">보유한 쿠폰 및 리워드</p>
          </div>
        </div>

        {/*//* 최신 소식 / 이벤트 리스트 */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-800">진행 중인 프로그램</h3>
            <button className="text-xs text-blue-600 font-semibold">전체보기</button>
          </div>
          
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-4 bg-white p-4 rounded-2xl border border-slate-100">
              <div className="w-20 h-20 bg-slate-200 rounded-xl overflow-hidden shrink-0">
                <div className="w-full h-full bg-linear-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                  <MapPin className="text-white w-6 h-6" />
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-[10px] font-bold text-blue-600 mb-1">POP-UP STORE</p>
                <h4 className="font-bold text-slate-800 text-sm mb-1">플랜얼라이언스 성수 팝업</h4>
                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Calendar className="w-3 h-3" />
                  <span>2026.01.10 - 01.20</span>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>

      {isScannerOpen && (
        <QrScannerModal 
          onClose={() => setIsScannerOpen(false)} 
          onScanSuccess={handleScanSuccess} 
        />
      )}
      {showSuccess && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
          <div className="absolute inset-0 bg-blue-600/90 backdrop-blur-md" />
          <div className="relative bg-white rounded-[40px] p-10 w-full max-w-xs text-center shadow-2xl">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-blue-600 animate-bounce" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">인증 완료!</h2>
            <p className="text-slate-500 font-medium mb-6">
              100 마일리지가<br/>성공적으로 적립되었습니다.
            </p>
            <div className="flex items-center justify-center gap-2 text-blue-600 font-bold bg-blue-50 py-3 rounded-2xl">
              <PartyPopper className="w-5 h-5" />
              <span>+ 100 P</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}