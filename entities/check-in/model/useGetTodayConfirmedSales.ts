
import { getTodayConfirmedSales } from "@/entities/check-in/api";
import { useQuery } from "@tanstack/react-query";

export function useGetTodayConfirmedSales(shopId: string) {
    return useQuery({
        queryKey: ['today-confirmed-sales', shopId],
        queryFn: async() => {
           const res = await getTodayConfirmedSales(shopId)
           if(!res.success) throw new Error(res.message)
            return res.data
        },
        enabled: !!shopId,
        refetchInterval: false, 
        refetchOnWindowFocus: false,
    })
}