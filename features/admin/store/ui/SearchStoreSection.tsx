'use client'

import { useGetPartnerShops } from "@/entities/place/model";
import { SelectedStore, StoreSearchWidget } from "@/features/auth/ui/owner";
import { Coords, KakaoPlace } from "@/shared/model";
import { MapContainer } from "@/shared/ui/map";
import { useMemo } from "react";

interface SearchStoreSectionProps {
    displayCenter: Coords | undefined
    searchData: KakaoPlace[] | undefined
    activePlace: KakaoPlace | null
    selectedOwnerId: string | null
    onKeywordChange: (k: string) => void
    onPlaceClick: (place: KakaoPlace) => void
    onMarkerClick: (place: KakaoPlace) => void
}


export function SearchStoreSection({ displayCenter, searchData, activePlace, selectedOwnerId, onKeywordChange, onPlaceClick, onMarkerClick }: SearchStoreSectionProps) {

    const { data: partners } = useGetPartnerShops(searchData || [])

    const refinedPlaces = useMemo(() => {
        const partnerIdSet = new Set(partners?.map(p => p.kakao_place_id))
        return (searchData || []).map(place => ({
            ...place,
            isPartner: partnerIdSet.has(place.id)
        }))
    }, [partners, searchData])
    return (

        <div
            className="flex flex-col justify-center items-center mb-6"
        >
            <div className="flex flex-col w-full gap-4">
                <StoreSearchWidget handleKeywordChange={(k) => { onKeywordChange(k) }} />

                    {displayCenter && (
                        <MapContainer
                            center={displayCenter || { lat: 0, lng: 0 }}
                            places={refinedPlaces}
                            onMarkerClick={onMarkerClick}
                        />
                    )}

                {activePlace && selectedOwnerId ? (
                    <SelectedStore
                        place={activePlace}
                        onNext={() => onPlaceClick(activePlace)}
                        ownerId={selectedOwnerId}
                    />
                ) : (
                    <div className="p-3 bg-orange-50 text-orange-600 text-sm font-bold rounded-lg text-center">
                        {!selectedOwnerId ? "먼저 사장님을 선택해주세요" : "지도의 마커를 클릭하여 매장을 선택하세요"}
                    </div>
                )}
            </div>

        </div>

    )
}