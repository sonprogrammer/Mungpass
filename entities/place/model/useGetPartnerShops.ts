import { getPartnerShops } from "@/entities/place/api";
import { KakaoPlace } from "@/shared/model";
import { useQuery } from "@tanstack/react-query";

export function useGetPartnerShops(places: KakaoPlace[]){
    const kakaoIds = places.map(p => p.id)
    return useQuery({
        queryKey: ['partner-check', kakaoIds],
        queryFn: () => getPartnerShops(kakaoIds),
        enabled: kakaoIds.length > 0,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30
    })
}