'use client'

import { useUserStore } from "@/entities/user/model/useUserStore"
import { useRoleGuard } from "@/features/auth/model/useRoleGuard"

export function OwnerRoleRuard({children}:{children: React.ReactNode}){
    const profile = useUserStore(state => state.profile)

    useRoleGuard('owner')

    if(!profile) return null
    if(profile.role !== 'owner') return null

    return(
        <>
            {children}
        </>
    )
}