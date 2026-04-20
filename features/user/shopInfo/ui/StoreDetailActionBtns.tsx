'use client'

import { StoreDetailActionBtnsProps } from "@/features/user/shopInfo/model/types"
import { ChevronUp, Heart } from "lucide-react"

export function StoreDetailActionBtns({ 
    isMungPassPartner, 
    isPending, 
    isOpen, 
    todayShopStatus, 
    isScheduleOpen, 
    place, 
    onClick,
    toggleSave,
    isLiked
 }: StoreDetailActionBtnsProps) {
    return (
        <>
            <button
                disabled={!isMungPassPartner || isPending}
                onClick={onClick}
                className={`flex-[0.5] cursor-pointer py-4 hover:opacity-90 flex flex-col items-center justify-center rounded-3xl transition-all shadow-xl active:scale-[0.98]
                            ${!isMungPassPartner
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                        : isOpen
                            ? 'bg-emerald-500 text-white shadow-emerald-100'
                            : 'bg-slate-800 text-white shadow-slate-200'}`}
            >
                <div className="flex items-center gap-1">
                    {isMungPassPartner ? (
                        <>
                            <div className="flex flex-col items-start">
                                <span className="text-xs font-black opacity-80">{todayShopStatus}</span>
                            </div>
                            <ChevronUp className={`w-4 h-4 ml-1 transition-transform duration-300 ${isScheduleOpen ? 'rotate-180' : ''}`} />
                        </>
                    ) : (
                        <span className="text-xs font-black opacity-50 cursor-not-allowed!">미제휴 매장</span>
                    )}
                </div>
            </button>

            <a
                href={place.phone ? `tel:${place.phone}` : '#'}
                onClick={(e) => !place.phone && e.preventDefault()}
                className={` w-full py-4 flex flex-1 items-center justify-center bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-sm 
                            active:scale-[0.98] transition-all shadow-lg shadow-orange-200
                            ${!place.phone && 'opacity-50 cursor-not-allowed'}
                            `}
            >
                {place.phone ? `${place.place_name}에 전화걸기` : '등록된 번호가 없습니다'}
            </a>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    toggleSave(place)
                }}
                className={`cursor-pointer shrink-0 w-14 h-14 flex items-center justify-center rounded-2xl transitian-all shadow-lg bg-pink-200/50`}>
                <Heart className={`w-6 h-6 ${isLiked ? 'fill-pink-500 text-pink-500' : ''}`} />
            </button>
        </>
    )
}