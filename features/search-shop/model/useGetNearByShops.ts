'use client'

import { KakaoPlace } from "@/shared/types/map"
import { useEffect, useState, useTransition } from "react"

export function useGetNearByShops() {
    const [isPending, startTransition] = useTransition()
    const [data, setData] = useState({
        center: { lat : 37.541, lon: 127.058}, //기본 위치
        places: [] as KakaoPlace[] //검색 결과값
    })
    
    
    const fetchShops = () => {
        if(!navigator.geolocation) return
        
        navigator.geolocation.getCurrentPosition((pos) => {
            const coords = { lat: pos.coords.latitude, lon: pos.coords.longitude}
            console.log('coords', coords)
            
            if(window.kakao.maps.services){
                const ps = new window.kakao.maps.services.Places()
                ps.keywordSearch('애견 카페', (res, status) => {
                    if(status === window.kakao.maps.services.Status.OK){
                        startTransition(() => {
                            setData({center: coords, places: res as KakaoPlace[]})
                        })
                    }
                },{
                    location: new window.kakao.maps.LatLng(coords.lat, coords.lon),
                    radius: 2000
                })
            }
        })
    }

    useEffect(() => {
        fetchShops()
    },[])
 
    return {data, isPending}
}