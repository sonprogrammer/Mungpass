import { kakaologin } from "@/features/auth/api/kakaologin";


export function SocialLogin() {
    return (
        <div className="mt-8">
            {/* <div className="relative mb-6 text-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-orange-100"></div></div>
                <span className="relative bg-white px-4 text-[10px] font-bold text-orange-300 uppercase tracking-widest">간편 로그인</span>
            </div> */}
            <div className="w-full">
                <button 
                    onClick={kakaologin}
                    type="button" className="flex items-center justify-center w-full h-14 bg-yellow-300 hover:bg-yellow-400 cursor-pointer shadow-lg shadow-yellow-100 rounded-xl">
                    <span className="font-black">카카오톡</span>
                </button>
                
            </div>
        </div>
    )
}