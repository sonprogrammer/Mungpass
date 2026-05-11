'use client'

import { useGetNearByShops } from "@/features/search-shop/model/useGetNearByShops";
import { useSearchShops } from "@/features/search-shop/model/useSearchShops";
import { Bound } from "@/shared/model/map";
import { getCenterFromBound } from "@/shared/utils/map";


export function useAroundLogic(keyword: string, radius: number, newBound?: Bound | null){
    
    const isSearching = !!keyword && keyword.trim().length > 0
    
    // * 주변 애견카페 검색 모드 아닐때만 주변 샵 데이터 가져옴
    const { data: nearByData, isPending: nearByPending} = useGetNearByShops(radius, newBound,{enabled: !isSearching})
    // * 검색 애견카페 - 검색 모드 일때만 검색 api호출
    const { data: searchData, isPending: searchPending} = useSearchShops(keyword ,{ enabled: isSearching})

    const isSearchEmpty = isSearching && (!searchData || searchData.length === 0)

    
    const displayShops = (isSearching ? searchData : nearByData?.places) ?? []
    
    const displayCenter = (() => {
        if(newBound) return getCenterFromBound(newBound)
        if(isSearching && searchData?.[0]){
            return{lat: Number(searchData[0].y), lon: Number(searchData[0].x)}
        }
        return nearByData?.center ?? { lat: 37.5665, lon: 126.9780 }//서울시청
    })()

    
    
    
    return{
        isSearchEmpty,
        displayCenter,
        displayShops,
        isPending: isSearching ? searchPending : nearByPending
    }
}