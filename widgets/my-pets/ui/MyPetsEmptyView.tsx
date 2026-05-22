'use client'

import { MyPetsEmptyViewProps } from "@/widgets/my-pets/model/types"
import { AlertCircle } from "lucide-react"


export function MyPetsEmptyView({ onRegisterClick }: MyPetsEmptyViewProps) {
    return (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] shadow-sm border border-orange-50">
            <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-orange-200" />
            </div>
            <p className="text-slate-400 font-bold mb-6 text-center leading-relaxed">
                등록된 아이가 없네요!<br />
                새로운 가족을 등록해볼까요?
            </p>
            <button onClick={onRegisterClick} className="px-8 py-4 cursor-pointer bg-orange-400 text-white font-black rounded-2xl shadow-lg shadow-orange-100">
                지금 등록하기
            </button>
        </div>
    )
}