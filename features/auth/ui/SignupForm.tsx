'use client'

import { SignupFormProps, useSignupForm } from "@/features/auth/model"
import { SignupFields } from "@/features/auth/ui"
import { App } from "antd"

export function SignupForm({role, handleAuthAction} :SignupFormProps) {
    const signupLogic = useSignupForm()
    const { name, phone, passwords, isMatch, emailStatus } = signupLogic

    const { message} = App.useApp()

    const handleSubmit = async(formData: FormData) => {
        if(!name.trim()){
            message.error('이름을 입력해주세요')
            return
        }
        if(emailStatus !== 'available'){
            message.error('이메일 중복 확인을 해주세요')
            return
        }
        if(!isMatch){
            message.error('비밀번호가 일치하지 않습니다')
            return
        }
        await handleAuthAction(formData)
    }
    
    
    const isFormValid = 
        emailStatus === 'available' && 
        isMatch && 
        name.trim() !== '' && 
        phone.trim() !== '' && 
        passwords.password.length >= 6;

    return (
        <form action={handleSubmit}>
            <input type="hidden" name="role" value={role} />
            <SignupFields {...signupLogic}/>
            <button 
                type="submit"
                disabled={!isFormValid}
                className={`cursor-pointer w-full py-4 bg-slate-800 
                    text-white rounded-2xl text-lg font-black mt-8 
                    hover:bg-slate-900 shadow-xl shadow-slate-200 
                    ${isFormValid ? 'bg-slate-800 hover:bg-slate-900 shadow-xl shadow-slate-200 transition-all active:scale-[0.95]' 
                        : 'bg-slate-300! cursor-not-allowed!'}
                    `}
            >
                {role === 'owner' ? '파트너 가입하기' : '가입하기'}
            </button>
        </form>
    )
}