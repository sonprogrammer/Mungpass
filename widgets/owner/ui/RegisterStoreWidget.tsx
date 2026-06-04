'use client'

import { useUserStore } from "@/entities/user/model"
import { cookieLogout } from "@/features/auth/api"
import { useStoreRegistrationStore } from "@/features/auth/model/owner"
import { SelectedStore, SkipConfirmModal, StoreSearchWidget } from "@/features/auth/ui/owner"
import { useSearchShops } from "@/features/search-shop/model/useSearchShops"
import { KakaoPlace, useMyLocation } from "@/shared/model"
import { MapContainer } from "@/widgets/around/ui"
import { App } from "antd"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"

export function RegisterContent() {
    // * 다음페이지로 넘어가기위한 선택용
    const [activePlace, setActivePlace] = useState<KakaoPlace | null>(null)
    const [keyword, setKeyword] = useState<string>('')
    const [skipModalOpen, setSkipModalOpen] = useState<boolean>(false)
    const setSelectedPlace = useStoreRegistrationStore(state => state.setSelectedPlace)
    const resetLoginTabRole = useUserStore(state => state.resetLoginTabRole)

    // *검색 훅
    const { data: searchData, isPending } = useSearchShops(keyword)

    //* 현재 내위치 가져오기 
    const { data: myLocation, isLoading: isMyLocationLoading } = useMyLocation()

    const {message} = App.useApp()

    // * 검색 결과 없을 시
    useEffect(() => {
        if(!isPending && keyword && searchData?.length === 0){
            message.warning(`${keyword}에 대한 검색 결과가 없습니다`)
        }
    }, [searchData, isPending, keyword, message])

    // * 지도 중심, 초기에는 현재위치, 키워드 없으면 현재위치, 키워드 있을 시 그 가게 위치
    const displayCenter = useMemo(() => {
        if (keyword && searchData?.[0]) return { lat: Number(searchData[0].y), lon: Number(searchData[0].x) }
        return myLocation
    }, [keyword, searchData, myLocation])

    const handleKeywordChange = (newKeyword: string) => {
        setKeyword(newKeyword)
        setActivePlace(null)
    }

    const router = useRouter()
    const searchParams = useSearchParams()

    const ownerId = searchParams.get('ownerId')
    const mode = searchParams.get('mode')

    // *ownerId가 없을시 튕김
    useEffect(() => {
        if(!ownerId){
            message.error('잘못된 접근입니다. 다시 로그인해주세요')
            router.replace('/')
        }
    },[ownerId, router, message])

    const handleNextStep = useCallback(() => {
        if (!activePlace || !ownerId) return
        if(mode === 'edit'){
            router.push('/signup/owner/re-store')
            setSelectedPlace(activePlace)
        }else{
            setSelectedPlace(activePlace)
            router.push(`/signup/owner/auth?ownerId=${ownerId}`)
        }
    }, [ownerId, router, setSelectedPlace, activePlace, mode])

    const handleSkipStep = async () => {
        await cookieLogout()
        resetLoginTabRole()
        window.location.href = '/' //이거로 전역상태 초기화
    }

    // *ownerId가 없으면 얼리 리턴해주기
    if(!ownerId) return null

    return (

        <div className="flex flex-col h-full relative">


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
                handleKeywordChange={handleKeywordChange}
            />

            <div className="relative w-full pb-6">

                {isMyLocationLoading ? (
                    <div className="px-6 pt-4 h-80   animate-pulse">
                        <div className='bg-white w-full h-full rounded-[2.5rem] flex items-center justify-center'>
                            <p className="text-slate-400">내 위치를 확인 중입니다...</p>
                        </div>
                    </div>
                ) :
                    displayCenter ? (
                    <MapContainer
                        center={displayCenter}
                        places={searchData || []}
                        onMarkerClick={(place) => setActivePlace(place)}
                    />
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-slate-400">지도를 불러오는 중입니다...</p>
                    </div>
                )}

            </div>


            {activePlace && keyword ? (
                <div className="pb-6">
                    <SelectedStore
                        place={activePlace}
                        onNext={handleNextStep}
                        ownerId={ownerId}
                    />
                </div>
            ) : (
                <div className="absolute bottom-10 left-0 right-0 px-10 z-10 pointer-events-none">
                    <p className="bg-black/60 backdrop-blur-md py-3 rounded-full text-[11px] font-bold text-white text-center shadow-xl border border-white/20">
                        {keyword ? "등록할 가게 마커를 클릭해주세요" : "가게 이름을 검색해주세요"}
                    </p>
                </div>
            )
            }

            {/* //* skip모달 */}
            <SkipConfirmModal
                isOpen={skipModalOpen}
                onClose={() => setSkipModalOpen(false)}
                onConfirm={() => handleSkipStep()}
            />
        </div>

    )
}