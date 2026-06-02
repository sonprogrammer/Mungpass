
import { getTodayConfirmedSales } from "@/entities/check-in/api";
import { useQuery } from "@tanstack/react-query";

export function useGetTodayConfirmedSales(shopId: string) {
    return useQuery({
        queryKey: ['today-confirmed-sales', shopId],
        queryFn: () => getTodayConfirmedSales(shopId),
        enabled: !!shopId,
        refetchInterval: false, 
        refetchOnWindowFocus: false,
    })
}