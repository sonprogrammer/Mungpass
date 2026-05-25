'use client'

import { useUserStore } from "@/entities/user/model/useUserStore"
import { useRoleGuard } from "@/features/auth/model/useRoleGuard"
import { Loader2 } from "lucide-react"

export function UserRoleGuard({children}: {children: React.ReactNode}){
    const profile = useUserStore(state => state.profile)
    const isLoading = useUserStore(state => state.isLoading)

    useRoleGuard('user')

    if(isLoading){
        return(
            <div className="h-full w-full bg-[#FFFBEB] flex flex-col items-center justify-center">
                <Loader2 className="w-8 h-8 text-orange-500 animate-spin mb-2" />
                <p className="text-xs text-orange-400 font-bold">인증 정보 확인 중...</p>
            </div>
        )
    }

    if(!profile) return null
    if(profile.role !== 'user') return null

    return<>{children}</>
}