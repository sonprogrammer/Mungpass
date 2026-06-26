import { getMonths } from "@/entities/owner/api";
import { useOwnerStoreStatus } from "@/entities/owner/model";
import { useQuery } from "@tanstack/react-query";


export function useGetMonths(shopId: string) {
        const isVerified = useOwnerStoreStatus(state => state.isVerified)
    
    return useQuery({
        queryKey: ['months', shopId],
        queryFn: async() => {
            const res = await getMonths(shopId)
            if(!res.success) throw new Error(res.message)
            return res.data
        },
        enabled: !!shopId && isVerified,
        staleTime: 1000 * 60 * 60
    })
}