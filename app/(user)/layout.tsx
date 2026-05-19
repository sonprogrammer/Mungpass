'use client'

import { useUserStore } from "@/entities/user/model/useUserStore";
import { useRoleGuard } from "@/features/auth/model/useRoleGuard";
import { GlobalLiveUsage } from "@/widgets/dog/ui/GlobalLiveUsage";
import Header from "@/widgets/header/ui/Header";
import Navbar from "@/widgets/navbar/ui/Navbar";
import { App } from "antd";

export default function UserLayout({ children }: { children: React.ReactNode }) {
    const profile = useUserStore(state => state.profile)
    // *현재 로그인된 사용자가 user면 접근 허용
    useRoleGuard('user')
    if(!profile) return null

    if(profile.role !== 'user') return null
    
    return (
        <div className="flex justify-center bg-slate-200 h-screen">
            <App className="w-full h-full">
                <div className="w-full max-w-120 bg-white h-full flex flex-col relative mx-auto shadow-2xl">
                    <Header />

                    <main className={`flex-1 w-full bg-[#FFFBEB] overflow-y-auto `}>
                        {children}
                    </main>

                    <div className="absolute bottom-24 left-0 right-0 z-60 px-4 pointer-events-none">
                        <div className="pointer-events-auto">
                           <GlobalLiveUsage />
                        </div>
                    </div>

                    <div className="bg-[#FFFBEB] w-full shrink-0">
                        <Navbar />
                    </div>

                </div>
            </App>
        </div>
    )
}