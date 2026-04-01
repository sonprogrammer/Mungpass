import { getMonths } from "@/entities/owner/api/getMonths";
import { useQuery } from "@tanstack/react-query";


export function useGetMonths(shopId: string) {
    return useQuery({
        queryKey: ['months', shopId],
        queryFn: () => getMonths(shopId),
        enabled: !!shopId,
        staleTime: 1000 * 60 * 60
    })
}