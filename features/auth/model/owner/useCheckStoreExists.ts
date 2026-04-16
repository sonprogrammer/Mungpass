import { checkStoreExists } from "@/features/auth/api/checkStoreExists";
import { useQuery } from "@tanstack/react-query";

export function useCheckStoreExists(kakaoPlaceId: string) {
    return useQuery({
        queryKey: ['checkStore', kakaoPlaceId],
        queryFn: () => checkStoreExists(kakaoPlaceId),
        enabled: !!kakaoPlaceId,
        staleTime: 1000 * 60 * 5
    })
}