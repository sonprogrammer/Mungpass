'use client'

import { fetchNearByShops } from "@/features/search-shop/api/fetchNearByShops"
import { Bound, Coords } from "@/shared/types/map"
import { useQuery } from "@tanstack/react-query"


export const useGetNearByShops = (radius:number, newBound?: Bound | null) =>{
    return useQuery({
        queryKey: ['nearByShops', radius, newBound],
        queryFn: () => fetchNearByShops(radius, newBound),
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 30,
        retry: 2,
        refetchOnWindowFocus: false,
        enabled: !!radius
    })

}