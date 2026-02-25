'use client'

import { handleLogout } from "@/features/auth/api/handleLogout"
import { cookieLogout } from "@/features/auth/api/logoutAction"
import { LogOut } from "lucide-react"

export function LogoutBtn(){

    const logout = async() => {

        // TODO 서버 로그아웃 처리

        await handleLogout()
        await cookieLogout()
        console.log('cliekc')

    }
    
    return(
        <button 
            onClick={logout}
            className="flex items-center gap-2 text-slate-400 font-black text-sm hover:text-red-500 transition-colors py-2 px-6 rounded-full border border-slate-200"
          >
            <LogOut className="w-4 h-4" />
            로그아웃
          </button>
    )
}