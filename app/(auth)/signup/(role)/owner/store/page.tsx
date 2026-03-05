'use client'

import { SelectedStore } from "@/features/auth/ui/owner/SelectedStore"
import { StoreSearchWidget } from "@/features/auth/ui/owner/StoreSearchWidget"
import { useAroundState } from "@/widgets/around/model/useAroundState"
import { MapSection } from "@/widgets/around/ui/MapSection"
import { useRouter } from "next/navigation"

export default function OwnerStoreRegisterPage() {
    const { state, actions } = useAroundState()
    const router = useRouter()

    const handleNextStep = () => {
        if(!state.selectedPlace) return

        const { id, place_name } = state.selectedPlace
        router.push(`/signup/owner/auth?id=${id}&name=${encodeURIComponent(place_name)}`)
    }

    return (
        <div className="flex flex-col h-full">
            {/* //* 가게 검색/사업자 등록 */}
            <StoreSearchWidget
                setKeyword={actions.setKeyword}
                searchValue={state.searchValue}
                setSearchValue={actions.setSearchValue}
            />

            <div className="relative w-full pb-3">

                {state.center ? (
                    <MapSection
                        center={state.center}
                        places={state.keyword ? state.displayShops : []}
                        showRefreshBtn={false}
                        onMarkerClick={actions.setSelectedPlace}
                        onBoundChange={actions.handleCenterChange}
                        onRefresh={actions.handleRefresh}
                        onMyLocation={actions.handleMyLocation}
                    />
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-slate-400">지도를 불러오는 중입니다...</p>
                    </div>
                )}
                
            </div>

            {state.selectedPlace && state.keyword ? (
                <SelectedStore
                    place={state.selectedPlace}
                    onNext={handleNextStep}
                />
            ): (
                <div className="absolute bottom-10 left-0 right-0 px-10 z-10 pointer-events-none">
                    <p className="bg-black/60 backdrop-blur-md py-3 rounded-full text-[11px] font-bold text-white text-center shadow-xl border border-white/20">
                        {state.keyword ? "등록할 가게 마커를 클릭해주세요" : "가게 이름을 검색해주세요"}
                    </p>
                </div>
            )
            }

        </div>
    )
}