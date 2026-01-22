import { useRouter } from "next/navigation"


export function MembershipCard({userData}){
    const router = useRouter()
    return(
        <section className="bg-white rounded-[2.5rem] p-6 shadow-xl shadow-orange-200/10 border border-orange-50 relative overflow-hidden">
          
          <div className="relative z-10">
            <p className="text-[11px] text-slate-400 font-black uppercase tracking-tighter mb-1">나의 멍패스 현황</p>
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-800 tracking-tight">사용 가능한 혜택  
                     <span className="text-orange-500">
                        {userData.myCoupons}
                        
                    </span>
                    개
                </h3>
                <p className="text-xs text-slate-400 font-medium">이번 달 총 
                    {userData.visitCount}
                    
                    번 산책했어요!</p>
              </div>
              <button 
                onClick={() => router.push('/benefits')}
                className="bg-slate-900 text-white text-[10px] font-black px-4 py-2 rounded-xl active:scale-95 transition-all"
              >
                전체보기
              </button>
            </div>
          </div>
        </section>
    )
}