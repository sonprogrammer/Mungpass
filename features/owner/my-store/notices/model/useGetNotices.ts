import { useQuery } from "@tanstack/react-query";
import { getNotices } from "../api/getNotices";

export function useGetNotices(shopId: string){
    return useQuery({
        queryKey: ['notices', shopId],
        queryFn: () => getNotices(shopId),
        enabled: !!shopId,
        staleTime: 1000 * 60 * 10
    })
}