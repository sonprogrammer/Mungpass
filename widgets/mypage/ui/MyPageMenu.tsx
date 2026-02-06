'use client'

import { MenuItem } from "@/shared/ui/MenuItem";
import { Bell, CircleHelp, Clock, Heart, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export function MyPageMenu() {
    const router = useRouter()

    const handleNavigate = (page: string)=> {
        router.push(page)
    }
    
    return (
        <div className="space-y-8">
            <div className="space-y-3">
                <h3 className="text-[11px] font-black text-slate-400 uppercase ml-2 tracking-widest">나의 멍생활</h3>
                <div className="space-y-2">
                    <div className="group">
                        <MenuItem 
                            icon={<Heart className="w-5 h-5 text-pink-500" />} title="단골 멍패스 샵" 
                            onClick={() => handleNavigate('/save')}
                        />
                    </div>
                    <div className="group">
                        <MenuItem
                             icon={<Clock className="w-5 h-5 text-blue-500" />} title="이용 내역 확인"
                             onClick={() => handleNavigate('/history')}
                             />
                    </div>
                    <div className="group">
                        <MenuItem 
                            icon={<Bell className="w-5 h-5 text-orange-500" />} title="알림 설정" 

                        />
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <h3 className="text-[11px] font-black text-slate-400 uppercase ml-2 tracking-widest">서비스 안내</h3>
                <div className="space-y-2">
                    <div className="group">
                        <MenuItem icon={<MessageCircle className="w-5 h-5 text-slate-400" />} title="1:1 채팅 문의" />
                    </div>
                    <div className="group">
                        <MenuItem icon={<CircleHelp className="w-5 h-5 text-slate-400" />} title="자주 묻는 질문" />
                    </div>
                </div>
            </div>
        </div>
    )
}