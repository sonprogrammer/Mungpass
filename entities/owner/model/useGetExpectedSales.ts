import { getExpectSales } from "@/entities/owner/api/getExpectSales";
import { useOwnerStoreStatus } from "@/entities/owner/model/useOwnerStoreStatus";
import { useQuery } from "@tanstack/react-query";

export function useGetExpectedSales(shopId: string) {
        const isVerified = useOwnerStoreStatus(state => state.isVerified)
    
    return useQuery({
        queryKey: ['expectedSales', shopId],
        queryFn: () => getExpectSales(shopId),
        enabled: !!shopId && isVerified,
        staleTime: 1000 * 60 * 5,
        refetchInterval: 1000 * 60,
        refetchOnWindowFocus: true
    })
}