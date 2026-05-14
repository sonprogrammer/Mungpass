'use client'
import { App } from 'antd';

import { Bound, Coords, KakaoPlace } from "@/shared/model/map";
import { useAroundLogic } from "@/widgets/around/model/useAroundLogic";
import { useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast";
import { useStoreRegistrationStore } from '@/features/auth/model/owner/useStoreRegistStore';
import { useSearchShops } from '@/features/search-shop/model/useSearchShops';
import { useGetNearByShops } from '@/features/search-shop/model/useGetNearByShops';


export function useAroundState() {
  const selectedPlace = useStoreRegistrationStore(state => state.selectedPlace)
  const setSelectedPlace = useStoreRegistrationStore(state => state.setSelectedPlace)
  const [showMap, setShowMap] = useState<boolean>(false)
  const [keyword, _setKeyword] = useState<string>('')
  // * 범위(기본 2km)
  const [radius, setRadius] = useState<number>(2000)
  // * 지도 드래그시 지도 중앙 위치ㅈ
  const [mapCenter, setMapCenter] = useState<Bound | null>(null)
  // * 드래그시 카톡에 전송되는 값
  const [dragBound, setDragBound] = useState<Bound | null>(null)
  const [showRefreshBtn, setShowRefreshBtn] = useState<boolean>(false)
  const [currentCenter, setCurrentCenter]= useState<Coords | null>(null)

  // const { displayCenter, nearByShops, isPending } = useAroundLogic(radius, dragBound)
  const { data: nearByData, isPending: nearyByPending} = useGetNearByShops(radius, dragBound)
  const { data: searchData, isPending: searchPending} = useSearchShops(keyword)
  const { message} = App.useApp()

  // useEffect(() => {
  //   if(!isPending && nearByShops.length === 0 && keyword !== ''){
  //     toast.error('주변 결과가 없습니다. 다른지역을 찾아볼까요?', {id: 'search-empty', duration: 3000})
  //   }
  // },[nearByShops, isPending, keyword])
  

  const handleSetKeyword = useCallback((newKeyword: string)=> {
    _setKeyword(newKeyword)
    setDragBound(null)
    if(newKeyword.trim() === ''){
      setSelectedPlace(null)
    }
  },[setSelectedPlace])


  const handleSelectPlace = useCallback((place: KakaoPlace | null) => {
    setSelectedPlace(place);
  }, [setSelectedPlace])
  
  
  const handleMyLocation = useCallback(() => {
    setDragBound(null)
    setMapCenter(null)
    _setKeyword('')
    setSelectedPlace(null)

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((pos) => {
        const myCoords = { lat: pos.coords.latitude, lon: pos.coords.longitude}
        setCurrentCenter(myCoords)
      })
    }

  },[setSelectedPlace])

  // const handleToggleMap = useCallback(() => {
  //   if (isSearchEmpty) {
  //     message.warning('검색 결과가 없어 현재 위치를 기반으로 멍패스 샵 보여드립니다.')
  //     _setKeyword('')
  //     setShowMap(true)
  //     return
  //   }
  //   setShowMap(prev => !prev)
  // },[message, isSearchEmpty])

  const handleCenterChange = useCallback((bound: Bound) => {
    setMapCenter(bound)
    setShowRefreshBtn(true)

    if (currentCenter) {
      setCurrentCenter(null)
    }
  },[currentCenter])

  const handleRefresh = useCallback(() => {
    if (mapCenter) {
      setDragBound(mapCenter)
      setShowRefreshBtn(false)
    }
  },[mapCenter])

  return{
    state: { selectedPlace, showMap, keyword, radius, showRefreshBtn, 
      // center: currentCenter|| displayCenter || { lat: 37.5665, lon: 126.9780 }, 
      // displayShops,
      //  isPending
      },
    actions: {
        setSelectedPlace: handleSelectPlace, setShowMap, setKeyword: handleSetKeyword, setRadius, handleMyLocation,
        //  handleToggleMap,
          handleCenterChange, handleRefresh
    }
  }
}