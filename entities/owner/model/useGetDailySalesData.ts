import { getDailySalesData } from "@/entities/owner/api/getDailySalesData";
import { useQuery } from "@tanstack/react-query";

export function useGetDailySalesData(shopId: string) {
    return useQuery({
        queryKey: ['dailySalesData', shopId],
        queryFn: () => getDailySalesData(shopId),
        enabled: !!shopId,
        staleTime: 1000 * 60 * 60
    })
}