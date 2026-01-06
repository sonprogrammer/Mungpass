'use client';

// TODO 여기서 30초마다 갱신해서 어뷰징 막아놈 -> 큐알 코드 갱신하는쪽 즉 팝업스토어에서 테블릿이나 그런거로 켜놔야함,
// TODO 두번째 방안으로 사용자 현재 위치기반으로 100m이내 일때만 가능하게 설계

import React, { useState, useEffect, useMemo } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, RefreshCw, ShieldAlert } from 'lucide-react';

export default function QrModal({ userId, onClose }: { userId: string, onClose: () => void }) {
  const [seed, setSeed] = useState(() => Math.random().toString(36).substring(7));
  const [tick, setTick] = useState(() => Math.floor(Date.now() / 1000));

  // 2. 외부 시간 동기화
  useEffect(() => {
    const timer = setInterval(() => {
      setTick(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 3. 시간 계산
  const secondsInPeriod = 30;
  const currentPeriod = Math.floor(tick / secondsInPeriod);
  const timeLeft = secondsInPeriod - (tick % secondsInPeriod);

  // 4. 강제 갱신 
  const handleRefresh = () => {
    setSeed(Math.random().toString(36).substring(7));
  };


  const token = useMemo(() => {
    return `auth_${userId}_${currentPeriod}_${seed}`;
  }, [userId, currentPeriod, seed]);

 
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className="fixed inset-0 z-[999] bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-6" onClick={onClose}>
      <div 
        className="bg-white w-full max-w-xs rounded-[40px] p-8 flex flex-col items-center relative shadow-2xl" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-blue-500 to-indigo-600" />
        <button onClick={onClose} className="absolute top-4 right-4 p-3 text-slate-300"><X className="w-6 h-6" /></button>

        <div className="text-center mt-4 mb-8">
          <h3 className="text-xl font-bold text-slate-900 flex items-center justify-center gap-2">
            <ShieldAlert className="w-5 h-5 text-blue-600" /> 보안 체크인
          </h3>
          <p className="text-xs text-slate-500 mt-2 font-medium">30초마다 보안 코드가 자동 갱신됩니다.</p>
        </div>

        <div className="relative bg-white p-4 rounded-2xl border border-slate-100 shadow-inner">
          <QRCodeSVG value={token} size={180} level="H" />
        </div>

        <div className="mt-8 w-full">
          <div className="flex justify-between items-center mb-2 px-1 text-[10px] font-bold uppercase tracking-widest">
            <span className="text-slate-400 font-mono">ID: {currentPeriod % 1000}</span>
            <span className={timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-blue-600'}>00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full transition-all duration-1000 ease-linear ${timeLeft < 10 ? 'bg-red-500' : 'bg-blue-600'}`} style={{ width: `${(timeLeft / secondsInPeriod) * 100}%` }} />
          </div>
        </div>

        <button onClick={handleRefresh} className="mt-6 flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-blue-600 transition-all">
          <RefreshCw className="w-3.5 h-3.5" /> 코드 강제 갱신
        </button>
      </div>
    </div>
  );
}