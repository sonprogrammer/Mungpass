'use client';


import AroundHeader from '@/widgets/around/ui/AroundHeader';
import PlaceListState from '@/features/place/ui/PlaceListState';
import MapSection from '@/widgets/around/ui/MapSection';
import { StoreDetailBottomSheet } from '@/features/user/shopInfo/ui/StoreDetailBottomSheet';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchShops } from '@/features/search-shop/model/useSearchShops';
import { Bound } from '@/shared/model/map';
import { useGetNearByShops } from '@/features/search-shop/model/useGetNearByShops';
import { App } from 'antd';
import { useSelectedPlace } from '@/features/search-shop/model/useSelectedPlace';

export function AroundAllContent() {
    const [showMap, setShowMap] = useState(false)
    const [keyword, setKeyword] = useState<string>('')
    const [radius, setRadius] = useState<number>(2000)
    // *지도 드래그시 지도 중앙 위치 고정
    const [mapCenter, setMapCenter] = useState<Bound | null>(null)

    // * 드래그시 카톡에 전송되는 좌표
    const [dragBound, setDragBound] = useState<Bound | null>(null)
    const [showRefreshBtn, setShowRefreshBtn] = useState<boolean>(false)

    const setSelectedPlace = useSelectedPlace(state => state.setSelectedPlace)

    const { message } = App.useApp()

    const { data: searchData, isPending: searchPending } = useSearchShops(keyword)
    // * 현재 위치 주변 혹은 드래그시 그 주변
    const { data: nearShopData, isPending: nearShopPending } = useGetNearByShops(radius, dragBound)

    const isLoading = keyword ? searchPending : nearShopPending


    const displayCenter = useMemo(() => {
        if (keyword && searchData?.[0]) return { lat: Number(searchData[0].y), lon: Number(searchData[0].x) }
        if (nearShopData?.center) {
            return nearShopData.center
        }
        return { lat: 37.5665, lon: 126.9780 }
    }, [keyword, searchData, nearShopData])


    //* 지도 움직일 때
    const handleCenterChange = useCallback((bound: Bound) => {
        setMapCenter(bound)
        setShowRefreshBtn(true)
    }, [])

    // * 지도 움직이거 그 지역에서 재탐색할때
    const handleRefresh = useCallback(() => {
        if (mapCenter) {
            setDragBound(mapCenter)
            setShowRefreshBtn(false)
            setKeyword('')
        }
    }, [mapCenter])

    // * 내 위치로 이동
    const handleMyLocation = useCallback(() => {
        setDragBound(null)
        setMapCenter(null)
        setKeyword('')
        setSelectedPlace(null)
        setShowRefreshBtn(false)
    }, [setSelectedPlace])


    const toggleMap = useCallback(() => setShowMap(prev => !prev), [])

    const displayShops = useMemo(() => {
        if (keyword && searchData) {
            return searchData
        }
        return nearShopData?.places || []
    }, [keyword, searchData, nearShopData])


    // * 검색, 현재 위치에 따른 데이터 없음 알림
    useEffect(() => {
        if (isLoading) return

        if (keyword && searchData && searchData.length === 0) {
            message.destroy()
            message.warning(`'${keyword}'에 대한 검색 결과가 없습니다.`)
            return
        }

        if (!keyword && nearShopData && nearShopData.places.length === 0) {
            message.destroy()
            message.info('이 지역 주변에는 등록된 매장이 없어요.')
        }
    }, [keyword, searchData, nearShopData, isLoading, message])

    return (
        <div className="bg-[#FFFBEB] h-full  flex flex-col">

            <AroundHeader
                showMap={showMap}
                toggle={toggleMap}
                onSearch={setKeyword}
                radius={radius}
                setRadius={setRadius}
            />

            <main className="flex-1 min-h-0 overflow-y-auto flex flex-col">
                {showMap && displayCenter && (
                    <MapSection
                        center={displayCenter}
                        keyword={keyword}
                        // places={state.displayShops}
                        places={displayShops}
                        showRefreshBtn={showRefreshBtn}
                        onMarkerClick={setSelectedPlace}
                        onBoundChange={handleCenterChange}
                        onRefresh={handleRefresh}
                        onMyLocation={handleMyLocation}
                    />
                )}

                <div className='p-6 flex-1 '>

                    <PlaceListState
                        isPending={isLoading}
                        // places={state.displayShops}
                        places={displayShops}
                        onPlaceClick={setSelectedPlace}
                    />
                </div>


                <StoreDetailBottomSheet />
            </main>
        </div>
    );
}