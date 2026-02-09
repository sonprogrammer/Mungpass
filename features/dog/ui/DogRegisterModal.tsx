'use client'

import { DogRegisterModalProps } from "@/features/dog/model/types"
import { X } from "lucide-react"
import { useState } from "react"


export function DogRegisterModal({isOpen, onClose}: DogRegisterModalProps) {
    if(!isOpen){
        return null
    }
    
    return(
        <div className="fixed h-screen inset-0 z-100 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4">
            <div
                className="w-full max-w-md bg-white rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* //*헤더 */}
                <div className="flex justify-between items-center p-6 border-b border-orange-50">
                    <h2 className="text-xl font-black text-slate-800">애완견 등록</h2>
                    <button 
                        className="p-2 hover:bg-orange-50 rounded-full transition-color"
                        onClick={onClose}
                    >
                        <X className="w-6 h-6 "/>
                    </button>
                </div>

                {/*//* 제출 폼 */}
                <form className="p-6 space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">이름</label>
                        <input 
                            type="text" 
                            placeholder="강아지 이름을 입력해주세요"
                            className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-400 text-slate-800 outline-none"
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-2">
                            <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">몸무게(kg)</label>
                            <input 
                                type="number"
                                placeholder="0.0"
                                step="0.1"
                                className="w-full text-end p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-400 text-slate-800 outline-none"
                            />
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center">
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">대표 설정</label>
                        <input 
                            type="checkbox" 
                            className="w-6 h-6 rounded-lg accent-orange-400 cursor-pointer"
                        />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">특징</label>
                        <textarea 
                            rows={3}
                            placeholder="성격이나 건강 상태 등 특이사항을 적어주세요"
                            className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-400 text-slate-800 outline-none resize-none"
                        />
                    </div>

                    <button 
                        type="submit"
                        className="w-full py-4 bg-orange-400 text-white font-black rounded-2xl hover:bg-orange-500 transition-transform active:scale-[0.98] shadow-lg shadow-orange-100"
                    >
                        등록 하기
                    </button>
                </form>
            </div>
        </div>
    )
}