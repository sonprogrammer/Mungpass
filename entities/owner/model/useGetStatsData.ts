import { getStatsData } from "@/entities/owner/api";
import { useOwnerStoreStatus } from "@/entities/owner/model";
import { useQuery } from "@tanstack/react-query";

export function useGetStatsData(shopId: string, selectedMonth: string) {
        const isVerified = useOwnerStoreStatus(state => state.isVerified)
    
    return useQuery({
        queryKey: ['statsData', shopId, selectedMonth],
        queryFn: () => getStatsData(shopId, selectedMonth),
        enabled: !!shopId && !!selectedMonth && isVerified,
        staleTime: 1000 * 60 * 60
    })
}