import { getTodayTempStatus } from "@/features/owner/my-store/api/getTodayTempStatus";
import { useQuery } from "@tanstack/react-query";

export function useGetTodayTempStatus(shopId: string) {
    return useQuery({
        queryKey: ['todayTemp', shopId],
        queryFn: () => getTodayTempStatus(shopId),
        enabled: !!shopId,
        staleTime: 1000 * 60 * 30
    })
}