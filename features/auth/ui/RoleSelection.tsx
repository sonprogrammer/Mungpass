'use client'

import { ChevronRight, Store, User } from "lucide-react"
import Link from "next/link"

export function RoleSelection() {
    return(
        <div className="w-full max-w-md px-6 py-8 ">
            <div className="mb-8 text-center">
                <h2 className="text-2xl font-black">반가워요!</h2>
                <p className="text-slate-500 font-bold mt-2">어떤 목적으로 멍패스를 이용하시나요?</p>
            </div>

            <div className="space-y-4">
                {/* //*일반회원 */}
                <Link 
                    href='/signup/user'
                    className="group block p-6 bg-white rounded-3xl border-4 border-orange-100 shadow-xl shadow-orange-200/20 hover:border-orange-500 hover:-translate-y-1 transition-all duration-300"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="bg-orange-100 p-3 rounded-2xl group-hover:bg-orange-500 transiton-all">
                                <User className="w-6 h-6 text-orange-600 group-hover:text-white"/>
                            </div>
                            <div>
                                <p className="text-lg font-black">일반 보호자</p>
                                <p className="text-sm font-bold text-slate-400">우리 아이와 함께 이용해보세요</p>
                            </div>
                        </div>
                        <ChevronRight  className="w-6 h-6 text-slate-300 group-hover:text-orange-500"/>
                    </div>
                </Link>

                {/* //*사장 */}
                <Link
                    href='/signup/owner'
                    className="group block p-6 bg-slate-800 rounded-3xl border-4 border-slate-300 shadow-xl shadow-slate-900/20 hover:border-orange-500 hover:-translate-y-1 transition-all duration-300"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="bg-slate-700 p-3 rounded-2xl group-hover:bg-orage-500 transition-colors">
                                <Store className="w-6 h-6 text-orange-400 group-hover:text-white"/>
                            </div>
                            <div>
                                <p className="text-lg font-black text-white">애견카페 사장님</p>
                                <p className="text-sm font-bold text-slate-400">가게를 등록하고 고객관리의 효율을 올려보세요</p>
                            </div>
                        </div>
                        <ChevronRight  className="w-6 h-6 text-slate-500 group-hover:text-orange-500"/>
                    </div>
                </Link>
            </div>

            <div className="mt-8 text-center">
                <Link 
                    href='/'
                    className="text-sm font-bold text-slate-400 hover:text-orange-500 transition-colors"
                >
                이미 계정이 있으신가요? 
                <span className="text-orange-500 underline decoration-2 underline-offset-4 ml-1">
                로그인
              </span>
                </Link>
            </div>
            
        </div>
    )
}