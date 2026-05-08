import { checkStoreExists } from "@/features/auth/api/checkStoreExists";
import { useQuery } from "@tanstack/react-query";

export function useCheckStoreExists(kakaoPlaceId: string) {
    console.log('kakao', kakaoPlaceId)
    return useQuery({
        queryKey: ['checkStore', kakaoPlaceId],
        queryFn: () => checkStoreExists(kakaoPlaceId),
        enabled: !!kakaoPlaceId,
        staleTime: 1000 * 60 * 3,
        gcTime: 1000 * 60 * 60,
        placeholderData: undefined,
        retry: 1,
    })
}