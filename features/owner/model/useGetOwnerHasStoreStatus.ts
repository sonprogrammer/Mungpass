import { useUserStore } from "@/entities/user/model";
import { ownerHasStore } from "@/features/owner/api";
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