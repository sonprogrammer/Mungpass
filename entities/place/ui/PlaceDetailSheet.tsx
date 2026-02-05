'use client'

import { useGetSaveList } from "@/entities/place/model/useGetSaveList";
import { useToggleSaveList } from "@/entities/place/model/useToggleSaveList";
import { KakaoPlace } from "@/shared/model/map";
import { Heart } from "lucide-react";


export function PlaceDetailSheet({ place }: { place: KakaoPlace }) {
    const {data : saveLists} = useGetSaveList()
    const {mutate: toggleSave } = useToggleSaveList()

    const isLiked = saveLists?.some(list => String(list.shop_id) === String(place.id))
    console.log('islikec',saveLists)
    
    return (
        
        <div className="space-y-6 h-full flex flex-col pb-8">

            {place.distance && (
                <div className="flex items-center justify-center gap-2 py-2 mb-2 bg-orange-50/50 rounded-xl">
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
                    <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest">
                        현재 위치에서 {Number(place.distance) < 1000
                            ? `${place.distance}m`
                            : `${(Number(place.distance) / 1000).toFixed(1)}km`}
                    </p>
                </div>
            )}

            <div className="w-full flex-1 rounded-2xl overflow-hidden border border-slate-100">
                <iframe
                    src={place.place_url}
                    className="w-full h-full"
                    title="카카오맵 상세정보"
                />
            </div>

            <div className="flex gap-3 w-full">

                <a
                    href={place.phone ? `tel:${place.phone}` : '#'}
                    onClick={(e) => !place.phone && e.preventDefault()}
                    className={` w-full py-4 flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-sm 
                    active:scale-[0.98] transition-all shadow-lg shadow-orange-200
                    ${!place.phone && 'opacity-50 cursor-not-allowed'}
                    `}
                >
                    {place.phone ? `${place.place_name}에 전화걸기` : '등록된 번호가 없습니다'}
                </a>
                <button
                     onClick={(e) => {
                        e.preventDefault()
                        console.log('clicekd')
                        toggleSave(place)
                    }} 
                     className={`shrink-0 w-14 h-14 flex items-center justify-center rounded-2xl transitian-all shadow-lg bg-pink-200/50`}>
                    <Heart className={`w-6 h-6 ${isLiked ? 'fill-pink-500 text-pink-500' : ''}`}/>
                </button>
            </div>

            {/* //* 나중에 추가하기 */}
            {/* <button className="w-full py-4 bg-orange-500 text-white rounded-2xl font-black text-sm active:scale-[0.98] transition-all shadow-lg shadow-orange-200">
                멍패스 사용하기
            </button> */}
        </div>
    )
}