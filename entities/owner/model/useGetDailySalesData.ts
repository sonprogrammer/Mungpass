import { getDailySalesData } from "@/entities/owner/api";
import { useOwnerStoreStatus } from "@/entities/owner/model";
import { useQuery } from "@tanstack/react-query";

export function useGetDailySalesData(shopId: string, selectedMonth: string) {
        const isVerified = useOwnerStoreStatus(state => state.isVerified)
    
    return useQuery({
        queryKey: ['dailySalesData', shopId, selectedMonth],
        queryFn: () => getDailySalesData(shopId, selectedMonth),
        enabled: !!shopId && !!selectedMonth && isVerified,
        staleTime: 1000 * 60 * 60
    })
}