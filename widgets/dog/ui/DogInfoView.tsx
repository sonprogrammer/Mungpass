'use client'

import { getDogAge } from "@/entities/dog/lib/getDogAge"
import { Dog } from "@/entities/dog/model/types"
import { format } from "date-fns"
import { memo } from "react"

interface DogInfoViewProps {
    dog: Dog | undefined
    onTogglePrimary: () => void
}

function DogInfoView({ dog, onTogglePrimary }: DogInfoViewProps) {
    return (
        <>
            <div className="flex items-center gap-5 mb-6">
                {/* //* 강아지 사진 */}
                <div className="relative w-20 h-20 rounded-[1.8rem] bg-orange-50 overflow-hidden shadow-inner shrink-0">
                    <img src={dog?.image_url || "/icon.png"} className="w-full h-full object-cover" />
                </div>

                {/* //*이름  나이 */}
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">
                            {dog?.name || '이름 없음'}
                        </h1>
                        {dog?.birth_date && (
                            <span className="text-sm font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-lg">
                                {getDogAge(dog.birth_date)}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                        <span className={`text-[10px] font-black ${dog?.is_primary ? 'text-orange-500' : 'text-slate-400'}`}>
                            대표 애완견
                        </span>
                        <button
                            onClick={onTogglePrimary}
                            className={`relative w-8 h-4 rounded-full transition-colors duration-200 
                                                                        ${dog?.is_primary ? 'bg-orange-500' : 'bg-slate-200'
                                }`}
                        >
                            <div className={`absolute top-0.5 left-0.5 bg-white w-3 h-3 rounded-full transition-transform 
                                                                            duration-200 ${dog?.is_primary ? 'translate-x-4' : ''
                                }`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* //*품종 몸무게 생일 */}
            <div className="grid grid-cols-3 gap-3 mb-6 bg-white border border-slate-50 p-4 rounded-4xl shadow-sm">
                <div className="flex flex-col items-center border-r border-slate-50">
                    <label className="text-[10px] font-black text-slate-300 mb-1">품종</label>
                    <p className="text-sm font-bold text-slate-700 truncate w-full text-center px-1">
                        {dog?.breed || '-'}
                    </p>
                </div>

                <div className="flex flex-col items-center border-r border-slate-50">
                    <label className="text-[10px] font-black text-slate-300 mb-1">몸무게</label>
                    <p className="text-sm font-bold text-slate-700">
                        {dog?.weight ? `${dog.weight}kg` : '-'}
                    </p>
                </div>

                <div className="flex flex-col items-center">
                    <label className="text-[10px] font-black text-slate-300 mb-1">생일</label>
                    <p className="text-sm font-bold text-slate-700">
                        {dog?.birth_date ? format(new Date(dog.birth_date), 'yy.MM.dd') : '-'}
                    </p>
                </div>
            </div>

            {/* //* 특이사항 */}
            <div>
                <label className="text-xs font-black text-slate-400 ml-1 mb-2 block uppercase tracking-tighter">Memory / Note</label>
                <div className="relative">
                    <span className="absolute -top-2 left-3 text-2xl text-orange-200 font-serif">“</span>
                    <p className="text-[13px] text-slate-500 leading-relaxed px-6 py-4 bg-orange-50/30 rounded-2xl italic">
                        {dog?.description || '아직 작성된 특징이 없습니다.'}
                    </p>
                    <span className="absolute -bottom-5 right-3 text-2xl text-orange-200 font-serif">”</span>
                </div>
            </div>
        </>
    )
}

export default memo(DogInfoView)