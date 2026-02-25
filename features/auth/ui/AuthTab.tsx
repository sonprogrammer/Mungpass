import { AuthTabProps } from "@/features/auth/model/types"



export function AuthTab({isLogin, setIsLogin}: AuthTabProps) {

    return(
        <div className="p-6 pb-2 shrink-0 z-10">
          <div className="flex bg-orange-50 p-1.5 rounded-4xl">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 text-sm font-bold rounded-3xl transition-all ${isLogin ? 'bg-orange-500 text-white shadow-md' : 'text-orange-300'}`}
            >
              로그인
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 text-sm font-bold rounded-3xl transition-all ${!isLogin ? 'bg-orange-500 text-white shadow-md' : 'text-orange-300'}`}
            >
              회원가입
            </button>
          </div>
        </div>
    )
}