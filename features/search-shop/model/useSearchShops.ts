import { searchShops } from "@/features/search-shop/api/searchShops";
import { useQuery } from "@tanstack/react-query";



export function useSearchShops(keyword: string){
    return useQuery({
        queryKey: ['searchShops', keyword],
        queryFn: () => searchShops(keyword),
        enabled: !!keyword && keyword !== '애견 카페',
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 15
    })
}