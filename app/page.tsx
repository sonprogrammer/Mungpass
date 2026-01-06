'use client';

import React, { useState } from 'react';
import {useRouter} from 'next/navigation'
import { Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SubmitButton } from './components/SubmitButton';


export default function LandingPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState<boolean>(true)


  async function handleAuthAction(formData: FormData) {
    // 1. 여기서 formData.get('email') 등으로 데이터 추출 가능
    // 2. [TODO] Supabase Auth 호출 (예: await supabase.auth.signInWithPassword(...))
    
    // 임시 지연 (동작 확인용)
    await new Promise((res) => setTimeout(res, 1000));
    
    // 3. 성공 시 페이지 이동
    router.push('/home');
  }
  
  return (
    <div>
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
      {/* 상단 로고 및 문구 */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
          Plan <span className="text-blue-600">ALLIANCE</span>
        </h1>
        <p className="text-slate-500 text-sm font-medium">
          {isLogin ? '멤버십 서비스에 로그인하세요' : '새로운 멤버십 여정을 시작하세요'}
        </p>
      </div>

      {/* 인증 카드 */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">
        <div className="p-8">
          {/* 탭 전환 */}
          <div className="flex bg-slate-100 p-1 rounded-xl mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                isLogin ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              로그인
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                !isLogin ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              회원가입
            </button>
          </div>

          <form action={handleAuthAction} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 ml-1">이름</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input name="name" type="text" placeholder="홍길동" required className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 ml-1">이메일</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input name="email" type="email" placeholder="example@plan-a.com" required className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 ml-1">비밀번호</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input name="password" type="password" placeholder="••••••••" required className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" />
              </div>
            </div>

            {/* 분리한 버튼 사용 */}
            <SubmitButton isLogin={isLogin} />
          </form>

          {/* 추가 정보 */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex items-start gap-3">
              <div className="bg-blue-50 p-1 rounded-full mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {isLogin 
                  ? "플랜얼라이언스 멤버십에 로그인하여 등급별 특별 혜택과 마일리지를 확인하세요."
                  : "회원가입 즉시 D등급이 부여되며, 오프라인 QR 출석을 통해 등급을 올릴 수 있습니다."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 푸터 */}
      <p className="mt-8 text-slate-400 text-xs">
        © 2026 Plan ALLIANCE. All rights reserved.
      </p>
    </div>
    </div>
  );
}
