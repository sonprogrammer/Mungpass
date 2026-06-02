'use client'

import { SignupFormProps, useSignupForm } from "@/features/auth/model"
import { SignupFields } from "@/features/auth/ui"

export function SignupForm({role, handleAuthAction} :SignupFormProps) {
    const signupLogic = useSignupForm()



    return (
        <form action={handleAuthAction}>
            <input type="hidden" name="role" value={role} />
            <SignupFields {...signupLogic}/>
            <button 
                type="submit"
                className="cursor-pointer w-full py-4 bg-slate-800 text-white rounded-2xl text-lg font-black mt-8 hover:bg-slate-900 shadow-xl shadow-slate-200 transition-all active:scale-[0.95]"
            >
                {role === 'owner' ? '파트너 가입하기' : '가입하기'}
            </button>
        </form>
    )
}