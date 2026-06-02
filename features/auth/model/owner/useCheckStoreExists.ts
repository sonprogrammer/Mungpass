import { checkStoreExists } from "@/features/auth/api";
import { useQuery } from "@tanstack/react-query";

export function useCheckStoreExists(kakaoPlaceId: string, ownerId: string) {
    return useQuery({
        queryKey: ['checkStore', kakaoPlaceId, ownerId],
        queryFn: () => checkStoreExists(kakaoPlaceId, ownerId),
        enabled: !!kakaoPlaceId && !!ownerId,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        staleTime: 1000 * 60 * 3,
        gcTime: 1000 * 60 * 60,
        retry: 1,
    })

    
}