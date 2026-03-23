import { getTodayVisitCount } from "@/entities/check-in/api/getTodayVisitCount";
import { useGetShopInfo } from "@/entities/owner/model/useGetShopInfo";
import { useQuery } from "@tanstack/react-query";

export function useGetTodayVisitCount() {
    const { data} = useGetShopInfo()
    const shopId = data?.id
    return useQuery({
        queryKey: ['todayVisitCount', shopId],
        queryFn: () => {
                if(!shopId) throw new Error('shopId가 없습니다')
                return getTodayVisitCount(shopId!)},
        enabled: !!shopId,
        staleTime: 1000 * 60 * 30
    })
}