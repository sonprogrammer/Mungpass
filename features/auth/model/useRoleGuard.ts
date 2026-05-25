'use client'

import { useUserStore } from "@/entities/user/model/useUserStore"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function useRoleGuard(allowRole: string) {
    const router = useRouter()
    const profile = useUserStore(state => state.profile)
    const isLoading = useUserStore(state => state.isLoading)
    

    useEffect(() => {
        if(isLoading)return
        
        if(!profile) {
            router.replace('/')
            return 
        }

        if(profile.role !== allowRole){
            if(profile.role === 'user'){
               return router.replace('/home')
            }else if(profile.role === 'owner'){
               return router.replace('/owner')
            }else if(profile.role === 'admin'){
               return router.replace('/admin')
            }
            return router.replace('/')
        }
    },[profile, allowRole, router, isLoading])
}