import { getStatsData } from "@/entities/owner/api/getStatsData";
import { useQuery } from "@tanstack/react-query";

export function useGetStatsData(shopId: string, selectedMonth: string) {
    return useQuery({
        queryKey: ['statsData', shopId, selectedMonth],
        queryFn: () => getStatsData(shopId, selectedMonth),
        enabled: !!shopId && !!selectedMonth,
        staleTime: 1000 * 60 * 60
    })
}