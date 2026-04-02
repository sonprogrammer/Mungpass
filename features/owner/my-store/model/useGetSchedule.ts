import { getSchedule } from "@/features/owner/my-store/api/getSchedule";
import { useQuery } from "@tanstack/react-query";

export function useGetSchedule(shopId: string) {
    return useQuery({
        queryKey: ['schedules', shopId],
        queryFn: () => getSchedule(shopId),
        enabled: !!shopId,
        staleTime: 1000 * 60 * 60
    })
}