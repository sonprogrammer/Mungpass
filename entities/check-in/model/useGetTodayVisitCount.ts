
import { getTodayVisitCount } from "@/entities/check-in/api";
import { useGetShopInfo } from "@/entities/owner/model";
import { useQuery } from "@tanstack/react-query";

export function useGetTodayVisitCount() {
    const { data} = useGetShopInfo()
    const shopId = data?.id
    return useQuery({
        queryKey: ['todayVisitCount', shopId],
        queryFn: () => {
                if(!shopId) throw new Error('매장 정보가 없습니다')
                return getTodayVisitCount(shopId!)},
        enabled: !!shopId,
        staleTime: 1000 * 60 * 30,
        gcTime: 1000 * 60 * 60,
        select: (res) => {
            if(!res.success) throw new Error(res.message)
            return res.data
        }
    })
}