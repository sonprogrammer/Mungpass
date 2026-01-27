import { History, Heart } from "lucide-react"
import { useRouter } from "next/navigation"

export function Menu() {
    const router = useRouter()
    return (
        <div className="grid grid-cols-2 gap-4">
            <div onClick={() => router.push('/history')} className="bg-white p-5 rounded-4xl border border-orange-50 shadow-sm hover:shadow-md transition-all cursor-pointer">
                <div className="bg-orange-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
                    <History className="w-6 h-6 text-orange-500" />
                </div>
                <p className="font-bold text-slate-800">멍패스 기록</p>
                <p className="text-[10px] text-slate-400 mt-1">우리 아이 이용 내역</p>
            </div>

            <div
                onClick={() => router.push('/save')}
                className="bg-white p-5 rounded-4xl border border-orange-50 shadow-sm hover:shadow-md transition-all cursor-pointer group"
            >
                <div className="bg-pink-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Heart className="w-6 h-6 text-pink-500 fill-pink-500/10" />
                </div>
                <p className="font-bold text-slate-800">단골 멍패스</p>
                <p className="text-[10px] text-slate-400 mt-1">자주 가는 단골 매장</p>
            </div>
        </div>
    )
}