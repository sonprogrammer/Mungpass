'use client'

import { AuthTab } from "@/features/auth/ui/AuthTab"
import { LoginForm } from "@/features/auth/ui/LoginForm"
import { SignupForm } from "@/features/auth/ui/SignupForm"
import { SocialLogin } from "@/features/auth/ui/SocialLogin"
import { SubmitButton } from "@/features/auth/ui/SubmitButton"
import { BigLogo } from "@/shared/ui/BigLogo"
import { Footprints } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function AuthWidget() {
    const [isLogin, setIsLogin] = useState<boolean>(true)

    const [passwords, setPasswords] = useState({ password: '', confirm: '' });
    const isMatch = passwords.password !== '' && passwords.password === passwords.confirm;

    const router = useRouter()

    async function handleAuthAction(formData: FormData) {
      if (!isLogin && !isMatch) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
      await new Promise((res) => setTimeout(res, 1000));
      router.push('/home');
    }

    return(
        <div className="h-screen w-full bg-[#FFFBEB] flex flex-col justify-center items-center p-4 font-sans overflow-hidden">
      {/*  //*로고 자리 */}
      <BigLogo />


      <div className="w-full max-w-md bg-white rounded-4xl shadow-xl shadow-orange-200/40 border-4 border-orange-100 flex flex-col max-h-[80vh] relative overflow-hidden">

        <Footprints className="absolute -right-4 -top-4 w-24 h-24 text-orange-50/50 -rotate-12" />

        {/* //*로그인인지 회원가입인지 탭하는 버튼 */}
        <AuthTab isLogin={isLogin} setIsLogin={setIsLogin}/>
        

        <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar z-10">
          <form action={handleAuthAction} className="space-y-5 pt-4">
            {isLogin ? (
                <LoginForm />
            ): (
                <SignupForm />
            )}

          
            <div className="pt-2">
              <SubmitButton isLogin={isLogin} isMatch={false} />
            </div>

            {isLogin && (
              <div>
                {/* 여기에는 소설로그인 자리 */}
                <SocialLogin />
              </div>
         
            )}


          </form>
        </div>
      </div>
    </div>
    )
}

