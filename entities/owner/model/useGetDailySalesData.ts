import { getDailySalesData } from "@/entities/owner/api/getDailySalesData";
import { useQuery } from "@tanstack/react-query";

export function useGetDailySalesData(shopId: string, selectedMonth: string) {
    return useQuery({
        queryKey: ['dailySalesData', shopId, selectedMonth],
        queryFn: () => getDailySalesData(shopId, selectedMonth),
        enabled: !!shopId && !!selectedMonth,
        staleTime: 1000 * 60 * 60
    })
}