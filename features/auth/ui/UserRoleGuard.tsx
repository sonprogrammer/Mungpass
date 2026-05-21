'use client'

import { useUserStore } from "@/entities/user/model/useUserStore"
import { useRoleGuard } from "@/features/auth/model/useRoleGuard"

export function UserRoleGuard({children}: {children: React.ReactNode}){
    const profile = useUserStore(state => state.profile)

    useRoleGuard('user')

    if(!profile) return null
    if(profile.role !== 'user') return null

    return<>{children}</>
}