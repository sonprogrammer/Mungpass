'use client'

import { useUserStore } from "@/entities/user/model"
import { useRoleGuard } from "@/features/auth/model"
import { Loader2 } from "lucide-react"

export function OwnerRoleGuard({children}:{children: React.ReactNode}){
    const profile = useUserStore(state => state.profile)
    const isLoading = useUserStore(state => state.isLoading)

    useRoleGuard('owner')

    if(isLoading){
        return(
            <div className="h-full w-full bg-emerald-50 flex flex-col items-center justify-center">
                <Loader2 className="w-8 h-8 text-emerald-500 animate-spin mb-2" />
                <p className="text-xs text-slate-600 font-bold">인증 정보 확인 중...</p>
            </div>
        )
    }



    if(!profile) return null
    if(profile.role !== 'owner') return null

    return(
        <>
            {children}
        </>
    )
}