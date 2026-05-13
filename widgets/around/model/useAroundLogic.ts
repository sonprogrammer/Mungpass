'use client'

import { useGetNearByShops } from "@/features/search-shop/model/useGetNearByShops";
import { useSearchShops } from "@/features/search-shop/model/useSearchShops";
import { Bound } from "@/shared/model/map";
import { getCenterFromBound } from "@/shared/utils/map";


export function useAroundLogic(radius: number, newBound?: Bound | null){
    
    
    // * 주변 애견카페 검색 모드 아닐때만 주변 샵 데이터 가져옴
    const { data: nearByData, isPending: nearByPending} = useGetNearByShops(radius, newBound)
    // // * 검색 애견카페 - 검색 모드 일때만 검색 api호출
    // const { data: searchData, isPending: searchPending} = useSearchShops(keyword)




    
    // const displayCenter = (() => {
    //     if(newBound) return getCenterFromBound(newBound)
    //     if(searchData?.[0]){
    //         return{lat: Number(searchData[0].y), lon: Number(searchData[0].x)}
    //     }
    //     return nearByData?.center ?? { lat: 37.5665, lon: 126.9780 }//서울시청
    // })()

    
    
    
    return{
        nearByShops: nearByData?.places ?? [],
        displayCenter: nearByData?.center,
        isPending : nearByPending
    }
}