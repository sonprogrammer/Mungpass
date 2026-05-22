'use client'

import { DEFAULT_RADIUS } from "@/entities/place/model/constants";
import PlaceListState from "@/features/place/ui/PlaceListState";
import { useGetNearByShops } from "@/features/search-shop/model/useGetNearByShops";
import { useSelectedPlace } from "@/features/search-shop/model/useSelectedPlace";
import { StoreDetailBottomSheet } from "@/features/user/shopInfo/ui/StoreDetailBottomSheet";
import { MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

export function NearByPlace() {
    const router = useRouter()
    const setSelectedPlace = useSelectedPlace(state => state.setSelectedPlace)
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
                    setSelectedPlace(place)
                    console.log('place', place)
                }}
            />

            <div className="-mx-6">
                <StoreDetailBottomSheet />
            </div>

        </section>
    )
}