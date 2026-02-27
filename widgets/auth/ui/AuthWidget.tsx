'use client'

import { useAuthForm } from "@/features/auth/model/useAuthForm"
import { AuthTab } from "@/features/auth/ui/AuthTab"
import { LoginForm } from "@/features/auth/ui/LoginForm"
import { RoleTab } from "@/features/auth/ui/RoleTab"
import { SignupForm } from "@/features/auth/ui/SignupForm"
import { SocialLogin } from "@/features/auth/ui/SocialLogin"
import { SubmitButton } from "@/features/auth/ui/SubmitButton"
import { BigLogo } from "@/shared/ui/BigLogo"
import { Store } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function AuthWidget() {
  const [isOwner, setIsOwner] = useState<boolean>(false)
  const [isLogin, setIsLogin] = useState<boolean>(true)

  const { handleAuthAction } = useAuthForm('login')

  return (
    <div className="h-screen w-full bg-[#FFFBEB] flex flex-col justify-center items-center p-4 font-sans overflow-hidden">
      {/*  //*로고 자리 */}
      <BigLogo />



      <div className="w-full max-w-md bg-white rounded-4xl shadow-xl shadow-orange-200/40 border-4 border-orange-100 flex flex-col max-h-[80vh] relative overflow-hidden">

        <div className="p-6 flex flex-col text-center">
          <h2 className="text-2xl font-black text-slate-800">
            {isOwner ? '사장님 ' : '견주님'}
          </h2>
          <p className="text-sm text-slate-400 font-bold">멍패스에 오신 것을 환영해요!</p>
        </div>
        <div className={`flex justify-end ${!isLogin && 'hidden'}`}>
          {/* //* 사용자 관리 */}
          <RoleTab isOwner={isOwner} setIsOwner={setIsOwner} />
        </div>


        <div className="flex-1 overflow-y-auto px-8 pb-8 z-10">


          <form action={handleAuthAction} className="space-y-3 pt-4">
            {isLogin ? (
              <LoginForm />
            ) : (
              <SignupForm />
            )}


            <div className="pt-2">
              <SubmitButton isLogin={isLogin} />
            </div>

            {isLogin && (
              <div>
                <SocialLogin />
              </div>

            )}

          </form>

          <div className="mt-6 text-center">
            <Link
              href='/signup'
              className="text-sm font-bold text-slate-400 hover:text-orange-500 transition-colors"
            >
                아직 계정이 없으신가요? 
              <span className="text-orange-500 underline decoration-2 underline-offset-4 ml-1">
                회원가입
              </span>
            </Link>
          </div>

          {isLogin && (

            <div className="mt-8 pt-6 border-t border-dashed border-orange-100">
              <Link
                href='signup'
                className="group flex items-center justify-between p-4 bg-orange-50 rounded-2xl border border-orange-100 hover:bg-orange-100 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                    <Store className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-[13px] font-black text-slate-800">혹시 사장님이신가요?</p>
                    <p className="text-[11px] font-bold text-orange-400">멍패스 파트너로 입점하고 고객을 만나보세요</p>
                  </div>
                </div>
                <div className="text-orange-300 group-hover:text-orange-500 transition-colors">
                  <span className="text-xs font-black">가입하기</span>
                </div>
              </Link>
            </div>
          )}


        </div>
      </div>
    </div>
  )
}

