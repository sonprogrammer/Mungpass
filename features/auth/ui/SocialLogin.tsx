
import { kakaologin } from "@/features/auth/api";


export function SocialLogin() {
    return (
        <div className="mt-3">
            <div className="w-full">
                <button 
                    title='회원 유형을 선택해주세요'
                    onClick={kakaologin}
                    type="button" className="flex items-center justify-center w-full h-14 bg-yellow-300 hover:bg-yellow-400 cursor-pointer shadow-lg shadow-yellow-100 rounded-xl">
                    <span className="font-black">카카오톡으로 시작하기</span>
                </button>
                
            </div>
        </div>
    )
}