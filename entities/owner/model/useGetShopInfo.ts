import { getShopInfo } from "@/entities/owner/api/getShopInfo";
import { useUserStore } from "@/entities/user/model/useUserStore";
import { useQuery } from "@tanstack/react-query";

export function useGetShopInfo(){
    const profile = useUserStore(state => state.profile)
    const ownerId = profile?.id
    return useQuery({
        queryKey: ['shopInfo', ownerId],
        queryFn: () => getShopInfo(ownerId as string),
        enabled: !!ownerId,
        staleTime: 1000 * 60 * 60
    })
}