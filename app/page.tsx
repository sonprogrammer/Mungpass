'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Dog, Bone, Footprints, ShieldCheck, Smartphone, CheckCircle2 } from 'lucide-react';
import { SubmitButton } from './components/SubmitButton';

export default function LandingPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<boolean>(true);

  //  비밀번호 실시간 체크
  const [passwords, setPasswords] = useState({ password: '', confirm: '' });
  const isMatch = passwords.password !== '' && passwords.password === passwords.confirm;

  // 휴대폰 인증 관련 
  const [phone, setPhone] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  async function handleAuthAction(formData: FormData) {
    if (!isLogin && !isMatch) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    await new Promise((res) => setTimeout(res, 1000));
    router.push('/home');
  }

  return (
    <div className="h-screen w-full bg-[#FFFBEB] flex flex-col justify-center items-center p-4 font-sans overflow-hidden">

      <div className="mb-8 text-center shrink-0 animate-bounce-slow">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-full mb-3 shadow-lg shadow-orange-200">
          <Dog className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-1">
          멍 <span className="text-orange-500">패스</span>
        </h1>
        <p className="text-orange-400 text-[10px] font-bold uppercase tracking-[0.2em]">MungPass - Membership</p>
      </div>


      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-xl shadow-orange-200/40 border-4 border-orange-100 flex flex-col max-h-[80vh] relative overflow-hidden">

        <Footprints className="absolute -right-4 -top-4 w-24 h-24 text-orange-50/50 -rotate-12" />

        <div className="p-6 pb-2 shrink-0 z-10">
          <div className="flex bg-orange-50 p-1.5 rounded-4xl">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 text-sm font-bold rounded-3xl transition-all ${isLogin ? 'bg-orange-500 text-white shadow-md' : 'text-orange-300'}`}
            >
              로그인
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 text-sm font-bold rounded-3xl transition-all ${!isLogin ? 'bg-orange-500 text-white shadow-md' : 'text-orange-300'}`}
            >
              회원가입
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar z-10">
          <form action={handleAuthAction} className="space-y-5 pt-4">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-orange-400 ml-1">이름</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-200" />
                  <input name="name" type="text" placeholder="이름을 알려주세요!" required className="w-full pl-12 pr-4 py-4 bg-orange-50/30 border-2 border-orange-50 rounded-2xl focus:border-orange-500 focus:ring-0 outline-none font-medium text-sm transition-all" />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-orange-400 ml-1">이메일 주소</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-200" />
                <input name="email" type="email" placeholder="mungpass@example.com" required className="w-full pl-12 pr-4 py-4 bg-orange-50/30 border-2 border-orange-50 rounded-2xl focus:border-orange-500 focus:ring-0 outline-none font-medium text-sm transition-all" />
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="text-xs font-bold text-orange-400 ml-1 uppercase">휴대폰 번호</label>
                <div className="relative">
                  <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-200" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="010-0000-0000"
                    required={!isLogin}
                    className="w-full pl-12 pr-28 py-4 bg-orange-50/30 border-2 border-orange-50 rounded-2xl focus:border-orange-500 focus:ring-0 outline-none font-medium text-sm transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setIsCodeSent(true)}
                    className="absolute right-2 top-2 bottom-2 px-4 bg-orange-500 text-white text-[11px] font-black rounded-xl hover:bg-orange-600 transition-colors shadow-sm shadow-orange-200"
                  >
                    {isCodeSent ? '재발송' : '인증요청'}
                  </button>
                </div>

                {/* 인증 코드 입력란*/}
                {isCodeSent && !isVerified && (
                  <div className="mt-2 flex gap-2 animate-in zoom-in-95 duration-200">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="인증코드 6자리"
                        className="w-full px-5 py-3 bg-white border-2 border-orange-200 rounded-2xl text-sm font-bold text-orange-600 focus:border-orange-500 outline-none placeholder:text-orange-200"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsVerified(true)}
                      className="px-6 py-3 bg-orange-100 text-orange-600 text-xs font-bold rounded-2xl hover:bg-orange-200 transition-all border border-orange-200"
                    >
                      확인
                    </button>
                  </div>
                )}

                {/* 인증 완료 메시지 //TODO 인증코드 안맞을시에도 오류 alert뜨게 하기*/}
                {isVerified && (
                  <p className="text-[11px] text-green-500 font-bold flex items-center gap-1 mt-1.5 ml-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> 본인 인증이 완료되었습니다! 🐾
                  </p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-orange-400 ml-1">비밀번호</label>
              <div className="relative">
                <Bone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-200" />
                <input
                  name="password"
                  type="password"
                  placeholder="비밀번호는 비밀!"
                  required
                  value={passwords.password}
                  onChange={(e) => setPasswords({ ...passwords, password: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-orange-50/30 border-2 border-orange-50 rounded-2xl focus:border-orange-500 focus:ring-0 outline-none font-medium text-sm transition-all"
                />
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-500">
                <label className="text-xs font-bold text-orange-400 ml-1">비밀번호 확인</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-200" />
                  <input
                    name="passwordConfirm"
                    type="password"
                    placeholder="비밀번호를 한 번 더 적어주세요!"
                    required
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                    className={`w-full pl-12 pr-12 py-4 bg-orange-50/30 border-2 rounded-2xl outline-none font-medium text-sm transition-all ${passwords.confirm === ''
                        ? 'border-orange-50'
                        : isMatch
                          ? 'border-green-400 focus:border-green-500'
                          : 'border-red-300 focus:border-red-400'
                      }`}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {passwords.confirm !== '' && (
                      isMatch
                        ? <CheckCircle2 className="w-5 h-5 text-green-500 animate-in zoom-in" />
                        : <div className="w-5 h-5 text-red-400 font-bold animate-bounce">!</div>
                    )}
                  </div>
                </div>

                {passwords.confirm !== '' && (
                  <p className={`text-[11px] font-bold ml-1 animate-in fade-in slide-in-from-left-1 ${isMatch ? 'text-green-500' : 'text-red-400'
                    }`}>
                    {isMatch
                      ? '비밀번호가 일치합니다'
                      : '비밀번호가 일치하지 않습니다.'}
                  </p>
                )}
              </div>
            )}

            <div className="pt-2">
              <SubmitButton isLogin={isLogin} />
            </div>

            {isLogin && (
              <div className="mt-8">
                <div className="relative mb-6 text-center">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-orange-100"></div></div>
                  <span className="relative bg-white px-4 text-[10px] font-bold text-orange-300 uppercase tracking-widest">간편 로그인</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" className="flex items-center justify-center gap-2 h-14 bg-[#FEE500] rounded-[1.25rem] hover:opacity-90 transition-opacity">
                    <span className="font-black text-[#3c1e1e] text-sm text-center w-4">K</span>
                    <span className="text-[13px] font-extrabold text-[#3c1e1e]">카카오톡</span>
                  </button>
                  <button type="button" className="flex items-center justify-center gap-2 h-12 bg-[#03C75A] rounded-2xl active:scale-95">
                    <span className="font-black text-white text-sm text-center w-4">N</span>
                    <span className="text-[13px] font-bold text-white">네이버</span>
                  </button>
                </div>
              </div>
            )}


          </form>
        </div>
      </div>
    </div>
  )
}