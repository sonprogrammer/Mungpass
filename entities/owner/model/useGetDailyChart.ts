import { getDailySalesForChart } from "@/entities/owner/api/getDailySalesForChart";
import { useOwnerStoreStatus } from "@/entities/owner/model/useOwnerStoreStatus";
import { useQuery } from "@tanstack/react-query";

export function useGetDailyChart(shopId: string, start: string, end: string) {
    const isVerified = useOwnerStoreStatus(state => state.isVerified)
    
    return useQuery({
        queryKey: ['dailyChart', shopId, start,end],
        queryFn: () => getDailySalesForChart(shopId, start,end),
        enabled: !!shopId && !!start && !!end && isVerified,
        staleTime: 1000 * 60 * 10
    })
}