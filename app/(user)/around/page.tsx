'use client';

import { useState } from 'react';

import { AroundHeader } from '@/widgets/around/ui/AroundHeader';
import { MapContainer } from '@/widgets/around/ui/MapContainer';
import { Bound, KakaoPlace } from '@/shared/model/map';
import { PlaceListState } from '@/entities/place/ui/PlaceListState';
import { BottomSheet } from '@/shared/ui/place/BottomSheet';
import { PlaceDetailSheet } from '@/entities/place/ui/PlaceDetailSheet';
import { useAroundLogic } from '@/widgets/around/model/useAroundLogic';
import { RefreshCw, LocateFixed } from 'lucide-react';

export default function AroundPage() {
  const [selectedPlace, setSelectedPlace] = useState<KakaoPlace | null>(null)
  const [showMap, setShowMap] = useState<boolean>(false)
  const [keyword, setKeyword] = useState<string>('')
  const [searchValue, setSearchValue] = useState<string>('')
  const [radius, setRadius] = useState<number>(2000)
  // * 지도 드래그시 지도 중앙 위치
  const [mapCenter, setMapCenter] = useState<Bound | null>(null)
  // * 드래그시 카톡에 전송되는 값
  const [dragBound, setDragBound] = useState<Bound | null>(null)
  const [showRefreshBtn, setShowRefreshBtn] = useState<boolean>(false)

  const { displayCenter, displayShops, isPending, isSearchEmpty } = useAroundLogic(keyword, radius, dragBound)

  const handleMyLocation = () => {
    setDragBound(null)
    setMapCenter(null)
    setKeyword('')

  }

  const handleToggleMap = () => {
    if (isSearchEmpty) {
      alert('검색 결과가 없어 현재 위치를 기반으로 멍패스 샵 보여드립니다.')
      setKeyword('')
      setSearchValue('')
      setShowMap(true)
      return
    }
    setShowMap(prev => !prev)
  }

  const handleCenterChange = (bound: Bound) => {
    setMapCenter(bound)
    setShowRefreshBtn(true)
  }

  const handleRefresh = () => {
    if (mapCenter) {
      setDragBound(mapCenter)
      setShowRefreshBtn(false)
    }
  }


  return (
    <div className="bg-[#FFFBEB] h-screen pb-24">

      <AroundHeader
        showMap={showMap}
        toggle={handleToggleMap}
        onSearch={setKeyword}
        searchValue={searchValue}
        setSearchValue={(search) => {
          setSearchValue(search)
          if (search.trim() === '') {
            setKeyword('')
          }
        }}
        radius={radius}
        setRadius={setRadius}
      />

      <main>
        {/* {showMap && displayShops.length > 0 && ( */}
        {showMap && (
          <div className='relative'>
            <MapContainer
              center={displayCenter}
              places={displayShops}
              onMarkerClick={(place: KakaoPlace) => {
                console.log('내 장소:', place)
                setSelectedPlace(place)
              }}
              onBoundChange={handleCenterChange}
            />
            <button
              onClick={handleMyLocation}
              className='absolute top-10 right-10 z-10 bg-orange-500/50 p-1 rounded-lg cursor-pointer flex items-center justify-center'
              aria-label='현재위치로 이동'
            >
              <LocateFixed />
            </button>
            {showRefreshBtn && (
              <button
                onClick={handleRefresh}
                className='absolute top-10 left-1/2 -translate-x-1/2 z-40 bg-white/90 
                          backdrop-blur-sm px-4 py-2 rounded-full shadow-xl border-2 border-orange-500
                        text-orange-600 font-black text-xs flex items-center gap-2 animate-in slide-in-from-top-2
                          hover:scale-105 active:scale-95 transition-all
                        '
                aria-label='현 지도 지역내 검색'
              >
                <RefreshCw className="w-3 h-3" /> 이 지역 재검색
              </button>
            )}
          </div>
        )}

        <div className='p-6'>

          <PlaceListState
            isPending={isPending}
            places={displayShops}
            onPlaceClick={(place) => {
              console.log('place info', place)
              setSelectedPlace(place)
            }
            }
          />
        </div>

        <BottomSheet
          isOpen={selectedPlace !== null}
          onClose={() => setSelectedPlace(null)}
        >
          {selectedPlace && <PlaceDetailSheet place={selectedPlace} />}
        </BottomSheet>
      </main>
    </div>
  );
}