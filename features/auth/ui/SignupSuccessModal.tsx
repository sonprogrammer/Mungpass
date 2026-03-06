export function SignupSuccessModal() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white p-8 rounded-3xl flex flex-col items-center gap-4 shadow-2xl scale-in-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-4xl animate-bounce">
                    🎉
                </div>
                <div className="text-center">
                    <h3 className="text-xl font-bold text-slate-800">가입을 축하합니다!</h3>
                </div>
            </div>
        </div>
    )
}