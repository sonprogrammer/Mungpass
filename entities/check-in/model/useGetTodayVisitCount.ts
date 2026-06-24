
import { getTodayVisitCount } from "@/entities/check-in/api";
import { useGetShopInfo } from "@/entities/owner/model";
import { useQuery } from "@tanstack/react-query";

export function useGetTodayVisitCount() {
    const { data} = useGetShopInfo()
    const shopId = data?.id
    return useQuery({
        queryKey: ['todayVisitCount', shopId],
        queryFn: () => {
                if(!shopId) return null
                return getTodayVisitCount(shopId!)},
        enabled: !!shopId,
        staleTime: 1000 * 60 * 30
    })
}