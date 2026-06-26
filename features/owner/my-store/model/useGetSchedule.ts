import { getSchedule } from "@/features/owner/my-store/api";
import { useQuery } from "@tanstack/react-query";

export function useGetSchedule(shopId: string) {
    return useQuery({
        queryKey: ['schedules'],
        queryFn: async() => {
            const res = await getSchedule(shopId)
            if(!res.success) throw new Error(res.message)
            return res.data
        },
        enabled: !!shopId,
        staleTime: 1000 * 60 * 60
    })
}