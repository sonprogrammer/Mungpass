'use client'

import { StoreDetailActionBtnsProps } from "@/features/user/shopInfo/model"
import { Bell, Calendar, ChevronUp, Heart, Plane } from "lucide-react"
import { memo, useState } from "react"

function StoreDetailActionBtnsInner({
    isMungPassPartner,
    isPending,
    isOpen,
    todayShopStatus,
    place,
    onScheduleClick,
    toggleSave,
    isLiked,
    onNoticeClick,
    storeNotices,
    isOnVacation
}: StoreDetailActionBtnsProps) {
    const [showOptions, setShowOptions] = useState(false)

    const handleOptionClick = (action: () => void) => {
        action();
        setShowOptions(false);
    }

    return (
        <div className="relative flex gap-2 w-full items-center pb-5">

            {showOptions && (
                <>
                    <div className="fixed inset-0 z-40"
                        onClick={() => setShowOptions(false)}
                    />

                    <div className="absolute bottom-full left-0 mb-3 w-48 bg-white rounded-2xl shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.2)] border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-bottom-2">
                        <button
                            onClick={() => handleOptionClick(onNoticeClick)}
                            className="w-full flex items-center justify-between p-3 hover:bg-orange-50 rounded-xl transition-colors group"
                        >
                            <div className="flex items-center gap-2">
                                <Bell className={`w-4 h-4 ${storeNotices.length > 0 ? 'text-orange-500' : 'text-slate-400'}`} />
                                <span className="text-sm font-bold text-slate-700">매장 공지사항</span>
                            </div>
                            {storeNotices.length > 0 && (
                                <span className="flex h-2 w-2 rounded-full bg-orange-500" />
                            )}
                        </button>

                        <div className="h-px bg-slate-50 my-1" />

                        <button
                            onClick={() => handleOptionClick(onScheduleClick)}
                            className="w-full flex items-center gap-2 p-3 hover:bg-emerald-50 rounded-xl transition-colors"
                        >
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-emerald-500" />
                                <span className="text-sm font-bold text-slate-700">운영시간 정보</span>
                            </div>
                            {isOnVacation && (
                                <span className="flex items-center gap-1 text-sky-500 animate-pulse">
                                    <Plane className="w-4 h-4 fill-sky-500" />
                                    <span className="text-[10px] font-black">휴가</span>
                                </span>
                            )}
                        </button>
                    </div>
                </>
            )}

            <button
                disabled={!isMungPassPartner || isPending}
                onClick={() => setShowOptions(!showOptions)}
                className={`flex-[0.5] relative cursor-pointer py-4 hover:opacity-90 flex flex-col items-center justify-center rounded-3xl transition-all shadow-xl active:scale-[0.98]
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
                                {storeNotices && storeNotices.length > 0 && (
                                    <span className="absolute -top-0.5 right-[-0.2px] w-3 h-3 bg-orange-500 rounded-full border-2 border-white animate-pulse" />
                                )}
                            </div>
                            <ChevronUp className={`w-4 h-4 ml-1 transition-transform duration-300 `} />
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
        </div>
    )
}

export const StoreDetailActionBtns = memo(StoreDetailActionBtnsInner)