import { getVacation } from "@/features/owner/my-store/api/getVacation";
import { useQuery } from "@tanstack/react-query";

export function useGetVacation(shopId: string) {
    return useQuery({
        queryKey: ['vacations', shopId],
        queryFn: () => getVacation(shopId),
        enabled: !!shopId,
        staleTime: 1000 * 60 * 60
    })
}