'use client'
import { useUserStore } from "@/entities/user/model/useUserStore"

export function RoleTab() {
    const setLoginTabRole = useUserStore(state => state.setLoginTabRole)
    const loginTabRole = useUserStore(state => state.loginTabRole)
    return(
        <div className="px-6 z-10 w-[50%]">
            <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                <button
                    type='button'
                    onClick={() => {
                        setLoginTabRole('user')
                    }}
                    className={`flex-1 py-2 text-xs font-black rounded-xl transition-all
                                ${loginTabRole === 'user' ? 'bg-orange-500 text-white shadow-md' : 'text-slate-400'}
                        `}
                >
                    견주님
                </button>
                <button
                    type='button'
                    onClick={() => {
                        setLoginTabRole('owner')
                    }}
                    className={`flex-1 py-2 text-xs font-black rounded-xl transition-all
                            ${loginTabRole === 'owner' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-400'}
                        `}
                >
                    사장님
                </button>
            </div>
        </div>
    )
}