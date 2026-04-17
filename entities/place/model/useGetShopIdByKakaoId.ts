import { getShopIdByKakaoId } from "@/entities/place/api/getShopIdByKakaoId";
import { useQuery } from "@tanstack/react-query";

export function useGetShopIdByKakaoId(kakaoId: string) {
    return useQuery({
        queryKey: ['shopIdByKakaoId', kakaoId],
        queryFn: () => getShopIdByKakaoId(kakaoId!),
        enabled: !!kakaoId,
        staleTime: 1000 * 60 * 60
    })
}