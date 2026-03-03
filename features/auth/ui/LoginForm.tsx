import { LoginFormProps } from "@/features/auth/model/types"
import { Bone, Mail } from "lucide-react"

export function LoginForm({email, setEmail, password, setPassword}: LoginFormProps) {

    return (
        <div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-orange-400 ml-1">이메일 주소</label>
                <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-200" />
                    <input
                        name="email"
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="mungpass@example.com"
                        required
                        className="w-full pl-12 pr-4 py-4 bg-orange-50/30 border-2 border-orange-50 rounded-2xl
                            focus:border-orange-500 focus:ring-0 outline-none font-medium text-sm transition-all" />
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold text-orange-400 ml-1">비밀번호</label>
                <div className="relative">
                    <Bone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-200" />
                    <input
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호"
                        required
                        className="w-full pl-12 pr-4 py-4 bg-orange-50/30 border-2 border-orange-50 rounded-2xl focus:border-orange-500 focus:ring-0 outline-none font-medium text-sm transition-all"
                    />
                </div>
            </div>
        </div>
    )
}