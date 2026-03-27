import { getExpectSales } from "@/entities/owner/api/getExpectSales";
import { useQuery } from "@tanstack/react-query";

export function useGetExpectedSales(shopId: string) {
    return useQuery({
        queryKey: ['expectedSales', shopId],
        queryFn: () => getExpectSales(shopId),
        enabled: !!shopId,
        staleTime: 1000 * 60 * 5
    })
}