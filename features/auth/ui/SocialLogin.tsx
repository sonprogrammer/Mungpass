

export function SocialLogin() {
    return (
        <div className="mt-8">
            <div className="relative mb-6 text-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-orange-100"></div></div>
                <span className="relative bg-white px-4 text-[10px] font-bold text-orange-300 uppercase tracking-widest">간편 로그인</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <button type="button" className="flex items-center justify-center gap-2 h-14 bg-[#FEE500] rounded-[1.25rem] hover:opacity-90 transition-opacity">
                    <span className="font-black text-[#3c1e1e] text-sm text-center w-4">K</span>
                    <span className="text-[13px] font-extrabold text-[#3c1e1e]">카카오톡</span>
                </button>
                <button type="button" className="flex items-center justify-center gap-2 h-12 bg-[#03C75A] rounded-2xl active:scale-95">
                    <span className="font-black text-white text-sm text-center w-4">N</span>
                    <span className="text-[13px] font-bold text-white">네이버</span>
                </button>
            </div>
        </div>
    )
}