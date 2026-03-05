'use client'

import { RegisterStatus } from "@/features/auth/ui/owner/RegisterStatus";
import { SuccessMsg } from "@/features/auth/ui/owner/SuccessMsg";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";


export default function OwnerCompletePage() {
    const router = useRouter()
    return(
        <div className="flex flex-col items-center px-6 pt-10 pb-12 h-full animate-in fade-in zoom-in duration-700">

            <SuccessMsg />

            <div className="w-full mt-10">
                <RegisterStatus />
            </div>

            <div className="w-full mt-auto">
                <button
                    onClick={() => router.push('/login')} // 실제 로그인 경로로 수정
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