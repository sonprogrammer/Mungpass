'use client'

import { useUserStore } from "@/entities/user/model/useUserStore"
import { useRoleGuard } from "@/features/auth/model/useRoleGuard"
import React from "react"

export function AdminRoleGuard({children}: {children: React.ReactNode}) {
    const profile = useUserStore(state => state.profile)

    useRoleGuard('admin')

    if (!profile) return null
    if (profile.role !== 'admin') return null

    return (
        <>
            {children}
        </>
    )
}