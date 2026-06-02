import { checkStoreStatus } from "@/features/auth/api";
import { useQuery } from "@tanstack/react-query";

export function useCheckStoreStatus(ownerId: string) {
    return useQuery({
        queryKey: ['store-status', ownerId],
        queryFn: () => checkStoreStatus(ownerId),
        enabled: !!ownerId,
    })
}