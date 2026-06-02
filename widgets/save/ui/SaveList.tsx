'use client'

import { Favorites, useGetSaveList } from "@/entities/place/model"
import { useSelectedPlace } from "@/features/search-shop/model"
import { StoreDetailBottomSheet } from "@/features/user/shopInfo/ui"
import { NoResult } from "@/shared/ui"
import { MenuPageListCard } from "@/widgets/home-menu/ui"
import { Heart } from "lucide-react"



export function SaveList() {
    const setSelectedPlace = useSelectedPlace(state => state.setSelectedPlace)
    const { data: saveList, isPending } = useGetSaveList()

    const handleMenuClick = (place: Favorites) => {
        const placeData = {
            id: place.kakao_place_id,
            place_name: place.shop_name,
            address_name: place.address,
            category_name: place.category_name,
            place_url: place.place_url,
            phone: place.phone ?? '',
            x: '',
            y: '',
            road_address_name: ''
        }
        return placeData
    }


    if (isPending) {
        return (
            <div className="p-6 space-y-6">
                <div className="animate-pulse bg-gray-50 rounded-3xl h-22 w-full" />
                <div className="animate-pulse bg-gray-50 rounded-2xl h-22 w-full" />
            </div>
        )
    }

    if (!saveList || saveList.length === 0) {
        return (
            <div className="p-6">
                <NoResult title="아직 찜한 장소가 없어요" description="마음에 드는 가게에 하트를 눌러보세요" />
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
            <StoreDetailBottomSheet />
        </>
    )
}