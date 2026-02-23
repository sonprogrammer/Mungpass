'use client'

import { Bound, KakaoPlace } from "@/shared/model/map";
import { useAroundLogic } from "@/widgets/around/model/useAroundLogic";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";


export function useAroundState() {
    const [selectedPlace, setSelectedPlace] = useState<KakaoPlace | null>(null)
  const [showMap, setShowMap] = useState<boolean>(false)
  const [keyword, setKeyword] = useState<string>('')
  const [searchValue, setSearchValue] = useState<string>('')
  // * 범위(기본 2km)
  const [radius, setRadius] = useState<number>(2000)
  // * 지도 드래그시 지도 중앙 위치
  const [mapCenter, setMapCenter] = useState<Bound | null>(null)
  // * 드래그시 카톡에 전송되는 값
  const [dragBound, setDragBound] = useState<Bound | null>(null)
  const [showRefreshBtn, setShowRefreshBtn] = useState<boolean>(false)

  const { displayCenter, displayShops, isPending, isSearchEmpty } = useAroundLogic(keyword, radius, dragBound)

  console.log('mapcenter', mapCenter)

  useEffect(() => {
    if(!isPending && displayShops.length === 0){
      toast.error('검색 결과가 없습니다. 다른지역을 찾아볼까요?', {id: 'search-empty', duration: 3000})
    }
  },[displayShops, isPending])
  
  const handleMyLocation = () => {
    setDragBound(null)
    setMapCenter(null)
    setKeyword('')

    navigator.geolocation.getCurrentPosition((pos) => {
      const coords = {lat: pos.coords.latitude, lon: pos.coords.longitude}
      setMapCenter(coords)
    })

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

  return{
    state: { selectedPlace, showMap, keyword, searchValue, radius, showRefreshBtn, displayCenter, displayShops, isPending},
    actions: {
        setSelectedPlace, setShowMap, setKeyword, setSearchValue, setRadius, handleMyLocation, handleToggleMap, handleCenterChange, handleRefresh
    }
  }
}