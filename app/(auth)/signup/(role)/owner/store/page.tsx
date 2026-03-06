'use client'

import { useStoreRegistrationStore } from "@/features/auth/model/owner/useStoreRegistStore"
import { SelectedStore } from "@/features/auth/ui/owner/SelectedStore"
import { SkipConfirmModal } from "@/features/auth/ui/owner/SkipConfirmModal"
import { StoreSearchWidget } from "@/features/auth/ui/owner/StoreSearchWidget"
import { useAroundState } from "@/widgets/around/model/useAroundState"
import { MapSection } from "@/widgets/around/ui/MapSection"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function OwnerStoreRegisterPage() {
    const { state, actions } = useAroundState()
    const setSelectedPlace = useStoreRegistrationStore(state => state.setSelectedPlace)
    const [skipModalOpen, setSkipModalOpen] = useState<boolean>(false)
    const router = useRouter()
    

    const handleNextStep = () => {
        if (!state.selectedPlace) return

        setSelectedPlace(state.selectedPlace)

        const { id, place_name } = state.selectedPlace
        router.push(`/signup/owner/auth?id=${id}&name=${encodeURIComponent(place_name)}`)
    }


    return (
        <div className="flex flex-col h-full">


            <div className="py-4 px-6 flex justify-between w-full relative">
                <h2 className="text-2xl font-black text-slate-800 leading-tight">
                    파트너님,<br /><span className="text-orange-500">지점을 등록해주세요</span>
                </h2>
                {/* //*건너 뛰기  */}
                <button
                    onClick={() => setSkipModalOpen(true)}
                    className="absolute bottom-5 right-10 font-semibold text-sm text-slate-500 underline underline-offset-3 cursor-pointer hover:font-bold"
                >
                    나중에 등록하기
                </button>
            </div>


            {/* //* 가게 검색/사업자 등록 */}
            <StoreSearchWidget
                setKeyword={actions.setKeyword}
                searchValue={state.searchValue}
                setSearchValue={actions.setSearchValue}
            />

            <div className="relative w-full pb-6">

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
                <div className="pb-6">
                    <SelectedStore
                        place={state.selectedPlace}
                        onNext={handleNextStep}
                    />
                </div>
            ) : (
                <div className="absolute bottom-10 left-0 right-0 px-10 z-10 pointer-events-none">
                    <p className="bg-black/60 backdrop-blur-md py-3 rounded-full text-[11px] font-bold text-white text-center shadow-xl border border-white/20">
                        {state.keyword ? "등록할 가게 마커를 클릭해주세요" : "가게 이름을 검색해주세요"}
                    </p>
                </div>
            )
            }

            {/* //* skip모달 */}
            <SkipConfirmModal
                isOpen={skipModalOpen}
                onClose={() => setSkipModalOpen(false)}
                onConfirm={() => router.push('/')}
            />
        </div>
    )
}