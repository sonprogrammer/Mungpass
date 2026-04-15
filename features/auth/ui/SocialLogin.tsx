import { kakaologin } from "@/features/auth/api/kakaologin";


export function SocialLogin() {
    return (
        <div className="mt-3">
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