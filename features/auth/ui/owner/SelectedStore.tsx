'use client'

import { useCheckStoreExists } from "@/features/auth/model/owner/useCheckStoreExists";
import { KakaoPlace } from "@/shared/model/map";
import { Loader2 } from "lucide-react";
import { memo } from "react";


export const SelectedStore = memo(function SelectedStore({ place, onNext }: { place: KakaoPlace, onNext: () => void }) {

    const { data: isAlreadyIn, isPending, isFetching } = useCheckStoreExists(place.id)

    console.log('place 셀렉티드', place)
    const isChecking = isPending || isFetching
    const displayIsAlreadyIn = isChecking ? false : isAlreadyIn

    return (
        <div className="px-6 z-30 animate-in slide-in-from-bottom-10">
            <div className="bg-white rounded-4xl shadow-2xl p-6 ">
                <div className="flex flex-col gap-3">
                    <div>
                        <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-bold">
                            선택된 가게
                        </span>
                        <h3 className="text-xl font-black mt-1">{place.place_name}</h3>
                        <p className="text-sm text-slate-500">{place.road_address_name}</p>
                    </div>

                    <button
                        onClick={onNext}
                        disabled={isPending || displayIsAlreadyIn}
                        className={`
                            w-full py-4 rounded-2xl font-black text-lg transition-all
                            ${displayIsAlreadyIn
                                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                : "bg-orange-500 text-white shadow-orange-200 shadow-lg active:scale-95 cursor-pointer"
                            }
                        `}
                    >
                        {isFetching ? (
                            <div className="flex items-center justify-center gap-2">
                                <Loader2 className="animate-spin" size={20} />
                                <span>확인 중...</span>
                            </div>
                        ) : displayIsAlreadyIn ? (
                            "이미 등록된 매장입니다"
                        ) : (
                            "이 장소로 등록 시작하기"
                        )}
                    </button>

                    {displayIsAlreadyIn && (
                        <p className="text-[11px] text-slate-400 text-center font-medium">
                            본인의 매장인데 등록이 안 된다면 고객센터로 문의해주세요.
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
})
