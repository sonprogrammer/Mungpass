import { CheckCircle2, ShieldCheck, Smartphone, User, Lock, Mail, Bone } from "lucide-react";
import { useState } from "react";

export function SignupForm() {
    // *휴대폰 인증 관련 
    const [phone, setPhone] = useState<string>('')
    const [isCodeSent, setIsCodeSent] = useState<boolean>(false)
    const [isVerified, setIsVerified] = useState<boolean>(false)
    //*  비밀번호 실시간 체크
    const [passwords, setPasswords] = useState({ password: '', confirm: '' })
    const isMatch = passwords.password !== '' && passwords.password === passwords.confirm
    
    return (
        <>
        {/* //* 이름 입력 */}
            <div className="space-y-2">
                <label className="text-xs font-bold text-orange-400 ml-1">이름</label>
                <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-200" />
                    <input name="name" type="text" placeholder="이름을 알려주세요!" required className="w-full pl-12 pr-4 py-4 bg-orange-50/30 border-2 border-orange-50 rounded-2xl focus:border-orange-500 focus:ring-0 outline-none font-medium text-sm transition-all" />
                </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-orange-400 ml-1">이메일 주소</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-200" />
                <input name="email" type="email" placeholder="mungpass@example.com" required className="w-full pl-12 pr-4 py-4 bg-orange-50/30 border-2 border-orange-50 rounded-2xl focus:border-orange-500 focus:ring-0 outline-none font-medium text-sm transition-all" />
              </div>
            </div>

            {/* //* 폰번호 입력 */}
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="text-xs font-bold text-orange-400 ml-1 uppercase">휴대폰 번호</label>
                <div className="relative">
                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-200" />
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="010-0000-0000"
                        className="w-full pl-12 pr-28 py-4 bg-orange-50/30 border-2 border-orange-50 rounded-2xl focus:border-orange-500 focus:ring-0 outline-none font-medium text-sm transition-all"
                    />
                    <button
                        type="button"
                        onClick={() => setIsCodeSent(true)}
                        className="absolute right-2 top-2 bottom-2 px-4 bg-orange-500 text-white text-[11px] font-black rounded-xl hover:bg-orange-600 transition-colors shadow-sm shadow-orange-200"
                    >
                        {isCodeSent ? '재발송' : '인증요청'}
                    </button>
                </div>

                {/* //*인증 코드 입력란*/}
                {isCodeSent && !isVerified && (
                    <div className="mt-2 flex gap-2 animate-in zoom-in-95 duration-200">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="인증코드 6자리"
                                className="w-full px-5 py-3 bg-white border-2 border-orange-200 rounded-2xl text-sm font-bold text-orange-600 focus:border-orange-500 outline-none placeholder:text-orange-200"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsVerified(true)}
                            className="px-6 py-3 bg-orange-100 text-orange-600 text-xs font-bold rounded-2xl hover:bg-orange-200 transition-all border border-orange-200"
                        >
                            확인
                        </button>
                    </div>
                )}

                {/* 인증 완료 메시지 //TODO 인증코드 안맞을시에도 오류 alert뜨게 하기*/}
                {isVerified && (
                    <p className="text-[11px] text-green-500 font-bold flex items-center gap-1 mt-1.5 ml-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> 본인 인증이 완료되었습니다! 🐾
                    </p>
                )}
            </div>

            {/* //* 비밀번호 입력 */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-orange-400 ml-1">비밀번호</label>
              <div className="relative">
                <Bone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-200" />
                <input
                  name="password"
                  type="password"
                  placeholder="비밀번호"
                  required
                  value={passwords.password}
                  onChange={(e) => setPasswords({ ...passwords, password: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-orange-50/30 border-2 border-orange-50 rounded-2xl focus:border-orange-500 focus:ring-0 outline-none font-medium text-sm transition-all"
                />
              </div>
            </div>


            {/* //* 비밀번호 확인 */}
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-500">
                <label className="text-xs font-bold text-orange-400 ml-1">비밀번호 확인</label>
                <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-200" />
                    <input
                        name="passwordConfirm"
                        type="password"
                        placeholder="비밀번호 확인"
                        required
                        value={passwords.confirm}
                        onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                        className={`w-full pl-12 pr-12 py-4 bg-orange-50/30 border-2 rounded-2xl outline-none font-medium text-sm transition-all ${passwords.confirm === ''
                            ? 'border-orange-50'
                            : isMatch
                                ? 'border-green-400 focus:border-green-500'
                                : 'border-red-300 focus:border-red-400'
                            }`}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        {passwords.confirm !== '' && (
                            isMatch
                                ? <CheckCircle2 className="w-5 h-5 text-green-500 animate-in zoom-in" />
                                : <div className="w-5 h-5 text-red-400 font-bold animate-bounce">!</div>
                        )}
                    </div>
                </div>

                {passwords.confirm !== '' && (
                    <p className={`text-[11px] font-bold ml-1 animate-in fade-in slide-in-from-left-1 ${isMatch ? 'text-green-500' : 'text-red-400'
                        }`}>
                        {isMatch
                            ? '비밀번호가 일치합니다'
                            : '비밀번호가 일치하지 않습니다.'}
                    </p>
                )}
            </div>
        </>
    )
}