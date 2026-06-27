import { getPartnerShops } from "@/entities/place/api";
import { KakaoPlace } from "@/shared/model";
import { useQuery } from "@tanstack/react-query";

export function useGetPartnerShops(places: KakaoPlace[]){
    const kakaoIds = places.map(p => p.id)
    return useQuery({
        queryKey: ['partner-check', kakaoIds],
        queryFn: async() => {
           const res = await getPartnerShops(kakaoIds)
           if(!res.success) throw new Error(res.message)
            return res.data
        },
        enabled: kakaoIds.length > 0,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30
    })
}