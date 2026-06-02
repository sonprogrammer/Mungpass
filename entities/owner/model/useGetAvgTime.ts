import { getAvgUsingTime } from "@/entities/owner/api";
import { useOwnerStoreStatus } from "@/entities/owner/model";
import { useQuery } from "@tanstack/react-query";

export function useGetAvgTime(shopId: string) {
    const isVerified = useOwnerStoreStatus(state => state.isVerified)
    return useQuery({
        queryKey: ['avgUsingTime', shopId],
        queryFn: () => getAvgUsingTime(shopId!),
        enabled: !!shopId && isVerified,
        staleTime: 1000 * 60 * 5,
        refetchInterval: 1000 * 60
    })
}