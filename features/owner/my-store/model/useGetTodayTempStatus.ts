import { getTodayTempStatus } from "@/features/owner/my-store/api";
import { useQuery } from "@tanstack/react-query";

export function useGetTodayTempStatus(shopId: string) {
    return useQuery({
        queryKey: ['todayTemp', shopId],
        queryFn: async() => {
           const res = await getTodayTempStatus(shopId)
           if(!res.success) throw new Error(res.message)
            return res.data
        },
        enabled: !!shopId,
        staleTime: 1000 * 60 * 5
    })
}