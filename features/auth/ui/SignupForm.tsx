'use client'

import { useAuthForm } from "@/features/auth/model/useAuthForm";
import { useSignupForm } from "@/features/auth/model/useSignupForm";
import { SignupFields } from "@/features/auth/ui/SignupFields";

export function SignupForm() {
    const signupLogic = useSignupForm()
    
    const { handleAuthAction } = useAuthForm('signup')


    return (
        <form action={handleAuthAction}>
            <SignupFields {...signupLogic}/>
            <button 
                type="submit"
                className="w-full py-4 bg-slate-800 text-white rounded-2xl text-lg font-black mt-8 hover:bg-slate-900 shadow-xl shadow-slate-200 transition-all active:scale-[0.95]"
            >
                가입하기
            </button>
        </form>
    )
}