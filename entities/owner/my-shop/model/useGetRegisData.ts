import { useOwnerStoreStatus } from "@/entities/owner/model/useOwnerStoreStatus";
import { getRegisData } from "@/entities/owner/my-shop/api/getRegisStauts";
import { useUserStore } from "@/entities/user/model/useUserStore";
import { useQuery } from "@tanstack/react-query";

export function useGetRegisData () {
    const profile = useUserStore(state => state.profile)
    const userId = profile?.id
    const isVerified = useOwnerStoreStatus(state => state.isVerified)

    return useQuery({
        queryKey: ['regisData'],
        queryFn: () => getRegisData(userId!),
        enabled: !!userId && isVerified,
        staleTime: 1000 * 60 * 60
    })
}