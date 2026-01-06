'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, CheckCircle2, MessageSquare, Smartphone, ShieldCheck } from 'lucide-react';
import { SubmitButton } from './components/SubmitButton';

export default function LandingPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<boolean>(true);

  // 1. 비밀번호 실시간 체크를 위한 상태
  const [passwords, setPasswords] = useState({ password: '', confirm: '' });
  const isMatch = passwords.password !== '' && passwords.password === passwords.confirm;

  // 휴대폰 인증 관련 상태
  const [phone, setPhone] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  async function handleAuthAction(formData: FormData) {
    // 회원가입 모드일 때 비밀번호 미일치 시 
    if (!isLogin && !isMatch) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    await new Promise((res) => setTimeout(res, 1000));
    router.push('/home');
  }

  return (
    <div className="h-screen w-full bg-slate-50 flex flex-col justify-center items-center p-4 font-sans overflow-hidden">
      
      {/* 상단 로고 (고정) */}
      <div className="mb-6 text-center shrink-0">
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-1">
          Plan <span className="text-blue-600">ALLIANCE</span>
        </h1>
        <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">Membership Service</p>
      </div>

      {/* 메인 카드 컨테이너 */}
      <div className="w-full max-w-md bg-white rounded-8 shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col max-h-[85vh]">
        
        <div className="p-6 pb-2 shrink-0">
          <div className="flex bg-slate-100 p-1.5 rounded-2xl">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${isLogin ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
            >
              로그인
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${!isLogin ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
            >
              회원가입
            </button>
          </div>
        </div>

        {/* 2. 스크롤 가능 영역 (입력 폼) */}
        <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar">
          <form action={handleAuthAction} className="space-y-5 pt-2">
            {!isLogin && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="text-xs font-bold text-slate-500 ml-1 uppercase">이름</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                  <input name="name" type="text" placeholder="홍길동" required className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none font-medium text-sm" />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 ml-1 uppercase">이메일 주소</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <input name="email" type="email" placeholder="example@plan-a.com" required className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none font-medium text-sm" />
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-400">
                <label className="text-xs font-bold text-slate-500 ml-1 uppercase">휴대폰 번호</label>
                <div className="relative">
                  <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="010-0000-0000"
                    className="w-full pl-12 pr-24 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none font-medium text-sm"
                  />
                  <button type="button" onClick={() => setIsCodeSent(true)} className="absolute right-2 top-2 bottom-2 px-4 bg-slate-900 text-white text-[10px] font-black rounded-xl uppercase">
                    {isCodeSent ? '재발송' : '인증요청'}
                  </button>
                </div>
                {isCodeSent && !isVerified && (
                  <div className="mt-2 flex gap-2 animate-in slide-in-from-top-2">
                    <input type="text" placeholder="코드 입력" className="flex-1 px-5 py-3 bg-blue-50 border border-blue-100 rounded-2xl text-sm font-bold text-blue-600 focus:outline-none" />
                    <button type="button" onClick={() => setIsVerified(true)} className="px-6 py-3 bg-blue-600 text-white text-xs font-bold rounded-2xl shadow-lg shadow-blue-200">확인</button>
                  </div>
                )}
                {isVerified && <p className="text-[11px] text-green-600 font-bold flex items-center gap-1 mt-1.5 ml-1"><ShieldCheck className="w-3.5 h-3.5" /> 본인 인증 완료</p>}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 ml-1 uppercase">비밀번호</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={passwords.password}
                  onChange={(e) => setPasswords({ ...passwords, password: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none font-medium text-sm"
                />
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-500">
                <label className="text-xs font-bold text-slate-500 ml-1 uppercase">비밀번호 확인</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                  <input
                    name="passwordConfirm"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                    className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none font-medium text-sm"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <CheckCircle2 className={`w-5 h-5 transition-colors ${isMatch ? 'text-blue-500' : 'text-slate-200'}`} />
                  </div>
                </div>
              </div>
            )}

            <SubmitButton isLogin={isLogin} />

            {isLogin && (
              <div className="mt-8">
                <div className="relative mb-6 text-center">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                  <span className="relative bg-white px-4 text-[10px] font-bold text-slate-300 uppercase tracking-widest">OR</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" className="flex items-center justify-center gap-2 h-12 bg-[#FEE500] rounded-2xl active:scale-95"><MessageSquare className="w-4 h-4 fill-[#3c1e1e]" /><span className="text-[13px] font-bold text-[#3c1e1e]">카카오</span></button>
                  <button type="button" className="flex items-center justify-center gap-2 h-12 bg-[#03C75A] rounded-2xl active:scale-95"><span className="font-black text-white text-sm text-center w-4">N</span><span className="text-[13px] font-bold text-white">네이버</span></button>
                </div>
              </div>
            )}
            
            <p className="text-[11px] text-slate-400 text-center pt-4">
              © 2026 Plan ALLIANCE. All rights reserved.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}