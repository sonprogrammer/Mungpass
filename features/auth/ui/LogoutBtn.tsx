'use client'

import { useUserStore } from "@/entities/user/model"
import { cookieLogout } from "@/features/auth/api"
import { ConfirmModal } from "@/shared/ui"
import { LogOut } from "lucide-react"
import { useState } from "react"

export function LogoutBtn() {

    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false)
    const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false)
    
    const userLogout = useUserStore(state => state.logout)
    const resetLoginTabRole = useUserStore(state => state.resetLoginTabRole)

    const handleCheckLogout = () => {
        setIsLogoutModalOpen(true)
    }

    const logout = async () => {
        try {
            setIsLoggingOut(true)
            setIsLogoutModalOpen(false)
            await cookieLogout()
            userLogout()
            resetLoginTabRole()
            window.location.href = '/'
        } catch (error) {
            console.error('로그아웃 실패',error)
        }finally{
            setIsLoggingOut(false)
        }

    }

    return (
        <>
            <button
                onClick={handleCheckLogout}
                className="flex items-center gap-2 text-slate-400 font-black text-sm hover:text-red-500 transition-colors py-2 px-6 rounded-full border border-slate-200"
            >
                <LogOut className="w-4 h-4" />
                로그아웃
            </button>

            <ConfirmModal 
                open={isLogoutModalOpen}
                title="로그아웃"
                description='정말 로그아웃 하시겠습니까?'
                onConfirm={logout}
                onCancel={() => setIsLogoutModalOpen(false)}
                confirmText='로그아웃'
                isLoading={isLoggingOut}
                confirmDanger={true}
                cancelText="취소"
            />
        </>
    )
}