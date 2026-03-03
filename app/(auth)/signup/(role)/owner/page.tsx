'use client'

import { useAuthForm } from "@/features/auth/model/useAuthForm"
import { StepBar } from "@/features/auth/ui/owner/StepBar"
import { SignupForm } from "@/features/auth/ui/SignupForm"
import { useRouter } from "next/navigation"
import { useState } from "react"



export default function OwnerSignupPage() {
    const [step, setStep] = useState<number>(1)
    const router = useRouter()

    const { handleAuthAction } = useAuthForm('signup', () => {router.push('/signup/owner/store')})

    
    
    return (
        <div className="w-full px-6 py-4  h-full">
            {/* //* 단계 표시 */}
            <StepBar />


            <div className="mb-8">
                <h2 className="text-2xl font-black text-slate-800 leading-tight">
                    {step === 1 ? (
                        <>파트너님,<br/><span className="text-orange-500">계정을 생성해주세요</span></>
                    ) : (
                        <>가게 정보를<br/><span className="text-orange-500">등록해 주세요</span></>
                    )}
                </h2>
            </div>

            {/* //* 폼 영역 */}
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <SignupForm role="owner" handleAuthAction={handleAuthAction}/>
                </div>
        </div>
    )
}