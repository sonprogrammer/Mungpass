import { UserProfile } from "@/entities/user/model/useUserStore";
import { Ticket } from "lucide-react";

export function UserStats({user}: {user: UserProfile | null}) {
    return(
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-900 p-5 rounded-4xl text-white shadow-xl shadow-slate-200">
            <p className="text-[10px] text-white/50 font-black uppercase mb-1 tracking-tighter">보유 쿠폰</p>
            <div className="flex items-center gap-2">
              <Ticket className="w-5 h-5 text-orange-400" />
              {/* //TODO 디비에서 받아온값을 넣어야함 */}
              <span className="text-xl font-black tracking-tight">3장</span>
            </div>
          </div>
          <div className="bg-orange-50 p-5 rounded-4xl border border-orange-100">
            <p className="text-[10px] text-orange-400 font-black uppercase mb-1 tracking-tighter">함께한 산책</p>
            <div className="flex items-center gap-1">
              {/* //TODO 디비에서 받아온값을 넣어야함 */}
              <span className="text-xl font-black text-orange-600">7</span>
              <span className="text-sm font-black text-orange-400">회</span>
            </div>
          </div>
        </div>
    )
}