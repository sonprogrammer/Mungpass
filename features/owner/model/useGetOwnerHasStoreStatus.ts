import { ownerHasStore } from "@/features/owner/api/ownerHasStore";
import { useQuery } from "@tanstack/react-query";

export function useGetOwnerHasStoreStatus(ownerId :string) {
    return useQuery({
        queryKey: ['ownerStore-status', ownerId],
        queryFn: () => ownerHasStore(ownerId),
        enabled: !!ownerId
    })
}