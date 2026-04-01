import { getMonthlySalesData } from "@/entities/owner/api/getMonthlySalesData";
import { useQuery } from "@tanstack/react-query";

export function useGetMonthlySalesData(shopId: string) {
    return useQuery({
        queryKey: ['monthlySalesData', shopId],
        queryFn: () => getMonthlySalesData(shopId),
        enabled: !!shopId,
        staleTime: 1000 * 60 * 60
    })
}