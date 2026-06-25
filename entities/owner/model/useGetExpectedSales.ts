import { getExpectSales } from "@/entities/owner/api";
import { useOwnerStoreStatus } from "@/entities/owner/model";
import { useQuery } from "@tanstack/react-query";

export function useGetExpectedSales(shopId: string) {
        const isVerified = useOwnerStoreStatus(state => state.isVerified)
    
    return useQuery({
        queryKey: ['expectedSales', shopId],
        queryFn: () => getExpectSales(shopId),
        enabled: !!shopId && isVerified,
        staleTime: 1000 * 60 * 5,
        refetchInterval: 1000 * 60,
        refetchOnWindowFocus: true,
        select: (res) => {
            if(!res.success) throw new Error(res.message)
            return res.data
        }
    })
}