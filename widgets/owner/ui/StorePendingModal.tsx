
export function StorePendingModal() {
    return (
        <div className="absolute inset-0 z- flex flex-col items-center justify-center px-6 text-center animate-in fade-in duration-700">
            <div className="bg-white/90 backdrop-blur-md p-10 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white">
                <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl animate-bounce">⏳</span>
                </div>

                <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">
                    매장 심사 중입니다
                </h3>

                <p className="text-slate-500 font-bold leading-relaxed mb-8">
                    관리자가 사장님의 매장 정보를<br />
                    꼼꼼하게 확인하고 있어요!
                </p>

                <div className="space-y-3">
                    <div className="py-3 px-6 bg-slate-900 text-white rounded-2xl text-sm font-black tracking-widest uppercase">
                        Under Review
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium">
                        승인이 완료되면 푸시 알림으로 알려드릴게요.
                    </p>
                </div>
            </div>
        </div>
    )
}