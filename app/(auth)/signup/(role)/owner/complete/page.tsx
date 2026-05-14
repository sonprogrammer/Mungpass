'use client'

import { cookieLogout } from "@/features/auth/api/logoutAction";
import { useStoreRegistrationStore } from "@/features/auth/model/owner/useStoreRegistStore";
import { RegisterStatus } from "@/features/auth/ui/owner/RegisterStatus";
import { SuccessMsg } from "@/features/auth/ui/owner/SuccessMsg";
import { App } from "antd";
import { LogIn } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";



function OwnerCompleteContent() {
    const router = useRouter()
    const reset = useStoreRegistrationStore(state => state.reset)
    
    const searchParams = useSearchParams()
    
    const ownerId = searchParams.get('ownerId')

    const { message} = App.useApp()
    
    useEffect(() => {
            if(!ownerId){
                message.error('잘못된 접근입니다. 다시 로그인해주세요')
                router.replace('/')
            }
        },[ownerId, router, message])
    
    const handleLoginBtn = async() => {
        try {
            // * supabase의 auth를 죽이기 위해 로그아웃을 실행
            await cookieLogout()
            // * 로컬스토리지에 저장된 매장 정보 삭제 
            reset()
        } catch (error) {
            console.error('logoutfaidl', error)

        }
    }
    
    if(!ownerId) return null
    
    return(
        <div className="flex flex-col items-center px-6 pt-10 pb-12 h-full animate-in fade-in zoom-in duration-700">

            <SuccessMsg />

            <div className="w-full mt-10">
                <RegisterStatus ownerId={ownerId}/>
            </div>

            <div className="w-full mt-auto">
                <button
                    onClick={handleLoginBtn}
                    className="w-full bg-orange-500 text-white py-5 rounded-2xl font-black text-lg 
                               shadow-xl shadow-slate-200 active:scale-[0.98] transition-all
                               flex items-center justify-center gap-2 cursor-pointer"
                >
                    <LogIn className="w-5 h-5" />
                    로그인 하러가기
                </button>
                
            </div>
        </div>
    )
}

export default function OwnerCompletePage() {
    return(
        <Suspense fallback={<div>로딩중...</div>}>
            <OwnerCompleteContent />
        </Suspense>
    )
}