'use client'

import { Favorites } from "@/entities/place/model/types"
import { useGetSaveList } from "@/entities/place/model/useGetSaveList"
import { PlaceDetailSheet } from "@/entities/place/ui/PlaceDetailSheet"
import { KakaoPlace } from "@/shared/model/map"
import { NoResult } from "@/shared/ui/NoResultUI"
import { BottomSheet } from "@/shared/ui/place/BottomSheet"
import { MenuPageListCard } from "@/widgets/home-menu/ui/MenuPageListCard"
import { Heart, Info, Loader2 } from "lucide-react"
import { useState } from "react"


export function SaveList() {
    const [selectedPlace, setSelectedPlace] = useState<KakaoPlace | null>(null)
    const { data: saveList, isPending } = useGetSaveList()


    const handleMenuClick = (place: Favorites): KakaoPlace => {
        const placeData = {
            id: place.shop_id,
            place_name: place.shop_name,
            address_name: place.address,
            category_name: place.category_name,
            place_url: place.place_url,
            phone: place.phone
        }
        return placeData
    }


    if (isPending) {
        return (
            <div className="flex justify-center py-20 mt-10">
                <Loader2 className="w-8 h-8 text-orange-400 animate-spin" />
            </div>
        )
    }

    if (!saveList || saveList.length === 0) {
        return (
            <div className="p-6">
                <NoResult title="아직 찜한 장소가 없어요" description="마음에 드는 가게에 하트를 눌러보세요"/>
            </div>

        )
    }

    return (
        <>
            <div className="space-y-4 pb-24 p-6">
                {saveList.map((list) => (
                    <MenuPageListCard
                        key={list.id}
                        icon={<Heart className="w-5 h-5 text-orange-500 fill-orange-500" />}
                        title={list.shop_name}
                        description={list.address}
                        onClick={() => setSelectedPlace(handleMenuClick(list))}
                    />
                ))}

            </div>
            <BottomSheet
                isOpen={selectedPlace !== null}
                onClose={() => setSelectedPlace(null)}
            >
                {selectedPlace && <PlaceDetailSheet place={selectedPlace} />}
            </BottomSheet>
        </>
    )
}