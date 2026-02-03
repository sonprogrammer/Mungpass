'use client'

import { DEFAULT_RADIUS } from "@/entities/place/model/constants";
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
    const { data, isPending } = useGetNearByShops(DEFAULT_RADIUS)
    
    const places = data?.places ?? []

    return (
        <section className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="font-extrabold text-slate-800 flex items-center gap-2">
                    주변 멍패스 존(2km 반경) <MapPin className="w-4 h-4 text-orange-500" />
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

        </section>
    )
}