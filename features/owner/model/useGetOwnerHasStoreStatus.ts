import { useUserStore } from "@/entities/user/model/useUserStore";
import { ownerHasStore } from "@/features/owner/api/ownerHasStore";
import { useQuery } from "@tanstack/react-query";

export function useGetOwnerHasStoreStatus() {
    const profile = useUserStore(state => state.profile)
    const ownerId = profile?.id
    return useQuery({
        queryKey: ['ownerStore-status', ownerId],
        queryFn: () => ownerHasStore(ownerId!),
        enabled: !!ownerId
    })
}