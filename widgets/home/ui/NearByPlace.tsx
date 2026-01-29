'use client'

import { PlaceDetailSheet } from "@/entities/place/ui/PlaceDetailSheet";
import { PlaceListState } from "@/entities/place/ui/PlaceListState";
import { useGetNearByShops } from "@/features/search-shop/model/useGetNearByShops";
import { KakaoPlace } from "@/shared/types/map";
import { BottomSheet } from "@/shared/ui/place/BottomSheet";
import { MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function NearByPlace() {
    const router = useRouter()
    const [selectedPlace, setSelectedPlace] = useState<KakaoPlace | null>(null)
    const { data, isPending } = useGetNearByShops()
    const places = data.places

    return (
        <section className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="font-extrabold text-slate-800 flex items-center gap-2">
                    주변 멍패스 존 <MapPin className="w-4 h-4 text-orange-500" />
                </h3>
                {/* //*클릭시 주변 찾기페이지로 넘어감 */}
                <button
                    onClick={() => router.push('/around')}
                    className="cursor-pointer hover:ring-1 hover:ring-orange-400 text-[11px] text-orange-500 font-bold bg-orange-50 px-3 py-1 rounded-full active:scale-95 transition-all"
                >
                    전체보기
                </button>
            </div>

            <PlaceListState
                isPending={isPending}
                places={places}
                onPlaceClick={(place) => {
                    console.log('list info', place)
                    setSelectedPlace(place)
                }}
            />

            <div className="-mx-6">
                <BottomSheet
                    isOpen={selectedPlace !== null}
                    onClose={() => setSelectedPlace(null)}
                >
                    {selectedPlace && <PlaceDetailSheet place={selectedPlace} />}
                </BottomSheet>
            </div>


            {/* //*여기서 각각의 카페 클릭시 아래에서 위로 슬라이드 되어서 사진, 번호, 가격, 위치 정보가 나옴 */}
            {/* <div className="bg-white p-4 rounded-4xl border border-orange-50 shadow-sm flex gap-4 items-center relative overflow-hidden group">
                <div className="w-20 h-20 bg-slate-100 rounded-2xl overflow-hidden shrink-0">
                    <div className="w-full h-full bg-orange-100 flex items-center justify-center">
                        <span className="text-2xl">☕</span>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-1.5 mb-1">
                        <span className="bg-green-100 text-green-600 text-[9px] font-black px-2 py-0.5 rounded-md uppercase">여유</span>
                        <p className="text-[10px] font-bold text-orange-500">CAFE</p>
                    </div>
                    <h4 className="font-extrabold text-slate-800 text-sm tracking-tight">멍멍 브루어리 성수</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">현재 3마리의 친구가 있어요!</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:translate-x-1 transition-transform" />
            </div> */}
        </section>
    )
}