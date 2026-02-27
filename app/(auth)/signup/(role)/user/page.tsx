
import { SignupForm } from "@/features/auth/ui/SignupForm"

export default function UserSignupPage() {

    return (
        <div className="w-full max-w-md px-6 py-4 flex flex-col h-full">


            <div className="mb-8">
                <h2 className="text-2xl font-black text-slate-800 leading-tight">
                    반가워요 보호자님!<br />
                    <span className="text-orange-500">정보를 입력해주세요</span>
                </h2>
            </div>

            <SignupForm />

            {/* //* 하단 */}
            <p className="mt-8 text-center text-[11px] text-slate-400 font-bold leading-relaxed">
                가입 시 멍패스의 <span className="underline decoration-slate-200">이용약관</span> 및 <span className="underline decoration-slate-200">개인정보 처리방침</span>에<br /> 동의하게 됩니다.
            </p>
        </div>
    )
}