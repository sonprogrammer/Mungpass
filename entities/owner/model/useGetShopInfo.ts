import { getShopInfo } from "@/entities/owner/api/getShopInfo";
import { useOwnerStoreStatus } from "@/entities/owner/model/useOwnerStoreStatus";
import { useUserStore } from "@/entities/user/model/useUserStore";
import { useQuery } from "@tanstack/react-query";

export function useGetShopInfo(){
    const profile = useUserStore(state => state.profile)
    const isVerified = useOwnerStoreStatus(state => state.isVerified)
    
    const ownerId = profile?.id
    return useQuery({
        queryKey: ['shopInfo', ownerId],
        queryFn: () => getShopInfo(ownerId as string),
        enabled: !!ownerId && isVerified,
        staleTime: 1000 * 60 * 60
    })
}