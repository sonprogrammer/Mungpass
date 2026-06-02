import { getMonthlySalesData } from "@/entities/owner/api";
import { useOwnerStoreStatus } from "@/entities/owner/model";
import { useQuery } from "@tanstack/react-query";

export function useGetMonthlySalesData(shopId: string) {
        const isVerified = useOwnerStoreStatus(state => state.isVerified)
    
    return useQuery({
        queryKey: ['monthlySalesData', shopId],
        queryFn: () => getMonthlySalesData(shopId),
        enabled: !!shopId && isVerified,
        staleTime: 1000 * 60 * 60
    })
}