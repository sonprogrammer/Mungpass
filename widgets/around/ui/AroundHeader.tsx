'use client'

import { RADIUS_OPTIONS } from "@/entities/place/model/constants";
import { AroundHeaderProps } from "@/entities/place/model/types";
import { LocateFixed, Map as MapIcon, Search, X } from "lucide-react";
import { memo, useState } from "react";



export function AroundHeader({ radius, setRadius, showMap, toggle, onSearch, onMyLocation }: AroundHeaderProps) {

    const [localValue, setLocalValue] = useState('')

    const handleSearch = () => {
        const trimmed = localValue.trim()
        if (trimmed) {
            onSearch(trimmed)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }


    return (
        <section className="p-6 bg-white rounded-b-[3rem] shadow-sm space-y-4 z-50">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-black text-slate-900">어디로 갈까요?</h2>
                    <p className="text-orange-500 text-sm font-bold">내 주변 멍패스 샵</p>
                </div>
                <button onClick={toggle} className={`cursor-pointer p-3 rounded-2xl transition-all flex items-center gap-2 font-black text-xs ${showMap ? 'bg-orange-500 text-white shadow-lg' : 'bg-orange-50 text-orange-500'}`}>
                    {showMap ? <X className="w-4 h-4" />
                        :
                        <MapIcon className="w-4 h-4" />}
                    {showMap ? '닫기' : '지도보기'}
                </button>
            </div>

            {/* //*검색창, 필터*/}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-200" />
                <input
                    type="text"
                    value={localValue ?? ''}
                    placeholder="시설명을 검색해보세요"
                    className="w-full pl-12 pr-4 py-4 bg-orange-50/50 border-2 border-orange-50 rounded-2xl outline-none focus:border-orange-500 transition-all text-sm font-bold"
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setLocalValue(e.target.value)}
                />
                {localValue && (
                    <button onClick={() => {
                        setLocalValue('')
                        onSearch('')
                    }}>
                        <X className="absolute right-3 top-1/2 -translate-y-1/2" />
                    </button>
                )}
            </div>

            <div className="flex items-center justify-between">
                {/* //* 내 주변 탐색시에만 반경이 나옴 */}
                {!localValue && (
                    <div className="flex gap-2 overflow-x-auto no-scrollbar">
                        {RADIUS_OPTIONS.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => setRadius(option.value)}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap border-2 cursor-pointer
                        ${radius === option.value
                                        ? 'bg-orange-500 border-orange-500 text-white'
                                        : 'bg-white border-orange-100 text-orange-300'}`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                )}
                <button
                    onClick={onMyLocation}
                    className='mr-4 p-1 rounded-xl bg-orange-500 text-white/80 cursor-pointer flex items-center justify-center'
                    aria-label='현재위치로 이동'
                    title="현재 위치 탐색"
                >
                    <LocateFixed />
                </button>
            </div>
        </section>
    )
}

export default memo(AroundHeader)