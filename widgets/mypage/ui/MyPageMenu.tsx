import { MenuItem } from "@/shared/ui/MenuItem";
import { Bell, CircleHelp, Clock, Heart, MessageCircle } from "lucide-react";

export function MyPageMenu() {
    return (
        <div className="space-y-8">
            <div className="space-y-3">
                <h3 className="text-[11px] font-black text-slate-400 uppercase ml-2 tracking-widest">나의 멍생활</h3>
                <div className="space-y-2">
                    <MenuItem icon={<Heart className="w-5 h-5 text-pink-500" />} title="단골 멍패스 샵" />
                    <MenuItem icon={<Clock className="w-5 h-5 text-blue-500" />} title="이용 내역 확인" />
                    <MenuItem icon={<Bell className="w-5 h-5 text-orange-500" />} title="알림 설정" />
                </div>
            </div>

            <div className="space-y-3">
                <h3 className="text-[11px] font-black text-slate-400 uppercase ml-2 tracking-widest">서비스 안내</h3>
                <div className="space-y-2">
                    <MenuItem icon={<MessageCircle className="w-5 h-5 text-slate-400" />} title="1:1 채팅 문의" />
                    <MenuItem icon={<CircleHelp className="w-5 h-5 text-slate-400" />} title="자주 묻는 질문" />
                </div>
            </div>
        </div>
    )
}