import { useQuery } from "@tanstack/react-query";
import { getNotices } from "../api/getNotices";

export function useGetNotices(shopId: string){
    return useQuery({
        queryKey: ['notices', shopId],
        queryFn: async() => {
            const res = await getNotices(shopId)
            if(!res.success) throw new Error(res.message)
            return res.data
        },
        enabled: !!shopId,
        staleTime: 1000 * 60 * 10
    })
}