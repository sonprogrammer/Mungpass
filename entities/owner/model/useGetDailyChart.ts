import { getDailySalesForChart } from "@/entities/owner/api/getDailySalesForChart";
import { useQuery } from "@tanstack/react-query";

export function useGetDailyChart(shopId: string, start: string, end: string) {
    return useQuery({
        queryKey: ['dailyChart', shopId, start,end],
        queryFn: () => getDailySalesForChart(shopId, start,end),
        enabled: !!shopId && !!start && !!end,
        staleTime: 1000 * 60 * 10
    })
}