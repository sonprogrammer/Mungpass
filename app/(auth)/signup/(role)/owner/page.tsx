'use client'

import { useAuthForm } from "@/features/auth/model/useAuthForm"

import { SignupForm } from "@/features/auth/ui/SignupForm"
import { SignupSuccessModal } from "@/features/auth/ui/SignupSuccessModal"
import { useRouter } from "next/navigation"
import { useState } from "react"



export default function OwnerSignupPage() {
    const [step, setStep] = useState<number>(1)
    const [showModal, setShowModal] = useState<boolean>(false)
    const router = useRouter()

    const { handleAuthAction } = useAuthForm('signup', () => {
        setShowModal(true)
        setTimeout(() => {
            router.push('/signup/owner/store')
        }, 1000);
    })

    
    
    return (
        <div className="w-full px-6 py-4  h-full">
            {/* //* 성공모달 */}
            {showModal && (
                <SignupSuccessModal />
            )}

            <div className="mb-6">
                <h2 className="text-2xl font-black text-slate-800 leading-tight">
                    파트너님,<br/><span className="text-orange-500">계정을 생성해주세요</span>
                </h2>
            </div>

            {/* //* 폼 영역 */}
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <SignupForm role="owner" handleAuthAction={handleAuthAction}/>
                </div>
        </div>
    )
}