'use client'

import { SignupFieldsProps } from "@/features/auth/model/types";
import { CheckCircle2, Smartphone, User, Lock, Mail, Bone, Loader2, AlertCircle } from "lucide-react";



export function SignupFields({
    email, setEmail, emailStatus, setEmailStatus, phone, setPhone, passwords, setPasswords,
    isMatch, handleEmailCheck
}: SignupFieldsProps) {
    return (
        <>
            {/* //* 이름 입력 */}
            <div className="space-y-2">
                <label className="text-xs font-bold text-orange-400 ml-1">이름</label>
                <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-200" />
                    <input name="name" type="text" placeholder="이름" required className="w-full pl-12 pr-4 py-4 bg-white border-2 border-orange-100 rounded-2xl focus:border-orange-500 focus:ring-0 outline-none font-medium text-sm transition-all" />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-orange-400 ml-1">이메일 주소</label>
                <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-200" />
                    <input
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (emailStatus !== 'idle') setEmailStatus('idle');
                        }}
                        placeholder="mungpass@example.com"
                        required
                        className={`w-full pl-12 pr-28 py-4 bg-white border-2 rounded-2xl outline-none font-medium text-sm transition-all
                            ${emailStatus === 'taken' ? 'border-red-500' : 'border-orange-100 focus:border-orange-500'}`}
                    />

                    {/* //* 중복 확인 버튼 */}
                    <button
                        type="button"
                        onClick={handleEmailCheck}
                        disabled={emailStatus === 'checking' || !email}
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-orange-200 text-orange-600 text-[11px] font-bold rounded-xl hover:bg-orange-200 disabled:bg-slate-700/80 disabled:text-slate-300 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                        {emailStatus === 'checking' ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                            "중복 확인"
                        )}
                    </button>
                </div>
                {emailStatus === 'taken' && (
                    <p className="text-[11px] text-red-400 font-bold ml-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        이미 사용 중인 이메일입니다.
                    </p>
                )}
                {emailStatus === 'available' && (
                    <p className="text-[11px] text-green-500 font-bold ml-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        사용 가능한 이메일입니다!
                    </p>
                )}
            </div>

            {/* //* 폰번호 입력 */}
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="text-xs font-bold text-orange-400 ml-1 uppercase">휴대폰 번호</label>
                <div className="relative">
                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-200" />
                    <input
                        type="tel"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="010-0000-0000"
                        required
                        className="w-full pl-12 pr-28 py-4 bg-white border-2 border-orange-100 rounded-2xl focus:border-orange-500 focus:ring-0 outline-none font-medium text-sm transition-all"
                    />

                </div>
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
                        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-orange-100 rounded-2xl focus:border-orange-500 focus:ring-0 outline-none font-medium text-sm transition-all"
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
                        className={`w-full pl-12 pr-12 py-4 bg-white border-2 rounded-2xl outline-none font-medium text-sm transition-all ${passwords.confirm === ''
                            ? 'border-orange-100'
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