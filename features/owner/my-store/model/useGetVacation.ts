import { getVacation } from "@/features/owner/my-store/api";
import { useQuery } from "@tanstack/react-query";

export function useGetVacation(shopId: string) {
    return useQuery({
        queryKey: ['vacations', shopId],
        queryFn: async() => {
            const res = await getVacation(shopId)
            if(!res.success) throw new Error(res.message)
            return res.data
        },
        enabled: !!shopId,
        staleTime: 1000 * 60 * 10
    })
}