'use client'

import { getSaveList } from "@/entities/place/api/getSaveList"
import { useQuery } from "@tanstack/react-query"


export const useGetSaveList = () => {

    return useQuery({
        queryKey: ['favorites'],
        queryFn: async () => {
            const res = await getSaveList()
            if (!res.success) throw new Error(res.message)
            return res.data
        },
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 30
    })
}