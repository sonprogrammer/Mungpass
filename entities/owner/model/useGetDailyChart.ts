import { getDailySalesForChart } from "@/entities/owner/api";
import { useOwnerStoreStatus } from "@/entities/owner/model";
import { useQuery } from "@tanstack/react-query";

export function useGetDailyChart(shopId: string, start: string, end: string, monthKey: string) {
    const isVerified = useOwnerStoreStatus(state => state.isVerified)
    
    return useQuery({
        queryKey: ['dailyChart', shopId, start,end, monthKey],
        queryFn: async() => {
            const res = await getDailySalesForChart(shopId, start,end)
            if(!res.success) throw new Error(res.message)
            return res.data
        },
        enabled: !!shopId && !!start && !!end && isVerified,
        staleTime: 1000 * 60 * 10
    })
}