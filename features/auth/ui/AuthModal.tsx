'use client';

import React, { useState } from 'react';
import { X, MessageSquare, Smartphone, ArrowRight } from 'lucide-react';

export default function AuthModal({ onClose, onAuthSuccess }: { onClose: () => void, onAuthSuccess: () => void }) {
  const [step, setStep] = useState<'login' | 'phone'>('login');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [isSent, setIsSent] = useState(false);

  return (
    <div className="fixed inset-0 z-100 bg-slate-900/90 backdrop-blur-sm flex items-end sm:items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-t-[40px] sm:rounded-[40px] p-8 pb-12 animate-in slide-in-from-bottom duration-300 relative">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-slate-500"><X /></button>

        {step === 'login' ? (
          <div className="space-y-8 mt-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-slate-900">간편 시작하기</h3>
              <p className="text-slate-500 text-sm mt-2">이벤트 참여를 위해 로그인이 필요합니다.</p>
            </div>

            <div className="space-y-3">
              {/* 카카오 로그인 */}
              <button 
                onClick={() => setStep('phone')}
                className="w-full bg-[#FEE500] text-[#3c1e1e] h-14 rounded-2xl font-bold flex items-center justify-center gap-3 active:scale-95 transition-all"
              >
                <MessageSquare className="w-5 h-5 fill-current" />
                카카오로 시작하기
              </button>
              {/* 네이버 로그인 */}
              <button 
                onClick={() => setStep('phone')}
                className="w-full bg-[#03C75A] text-white h-14 rounded-2xl font-bold flex items-center justify-center gap-3 active:scale-95 transition-all"
              >
                <span className="text-xl font-black">N</span>
                네이버로 시작하기
              </button>
            </div>
            
            <p className="text-[11px] text-center text-slate-400">
              로그인 시 서비스 <span className="underline">이용약관</span> 및 <span className="underline">개인정보처리방침</span>에 동의하게 됩니다.
            </p>
          </div>
        ) : (
          <div className="space-y-8 mt-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-slate-900">휴대폰 인증</h3>
              <p className="text-slate-500 text-sm mt-2">안전한 경품 지급을 위해 번호를 인증해주세요.</p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="tel" 
                  placeholder="010-0000-0000"
                  className="w-full h-14 bg-slate-50 border-none rounded-2xl pl-12 pr-28 font-bold text-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <button 
                  onClick={() => setIsSent(true)}
                  className="absolute right-2 top-2 bottom-2 px-4 bg-slate-900 text-white rounded-xl text-xs font-bold active:scale-95 transition-all"
                >
                  {isSent ? '재발송' : '인증요청'}
                </button>
              </div>

              {isSent && (
                <div className="animate-in fade-in slide-in-from-top-2">
                  <input 
                    type="number" 
                    placeholder="인증번호 6자리 입력"
                    className="w-full h-14 bg-slate-50 border-none rounded-2xl px-6 font-bold text-lg tracking-[0.5em] text-center focus:ring-2 focus:ring-blue-500 outline-none"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                  <p className="text-xs text-blue-600 mt-2 ml-1 font-medium italic text-center underline">인증번호가 도착하지 않으셨나요?</p>
                </div>
              )}
            </div>

            <button 
              disabled={!isSent || code.length < 4}
              onClick={onAuthSuccess}
              className="w-full h-14 bg-blue-600 disabled:bg-slate-200 text-white rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              인증 완료하기
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}