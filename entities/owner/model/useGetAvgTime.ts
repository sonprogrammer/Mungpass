import { getAvgUsingTime } from "@/entities/owner/api/getAvgUsingTime";
import { useQuery } from "@tanstack/react-query";

export function useGetAvgTime(shopId: string) {
    
    return useQuery({
        queryKey: ['avgUsingTime', shopId],
        queryFn: () => getAvgUsingTime(shopId!),
        enabled: !!shopId,
        staleTime: 1000 * 60 * 5
    })
}