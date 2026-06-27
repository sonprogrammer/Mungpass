import { getShopIdByKakaoId } from "@/entities/place/api";
import { useQuery } from "@tanstack/react-query";

export function useGetShopIdByKakaoId(kakaoId: string) {
    return useQuery({
        queryKey: ['shopIdByKakaoId', kakaoId],
        queryFn: async() => {
            const res = await getShopIdByKakaoId(kakaoId)
            if(!res.success) throw new Error(res.message)
            return res.data
        },
        enabled: !!kakaoId && kakaoId !== "undefined" && kakaoId !== "null",
        staleTime: 1000 * 60 * 60
    })
}