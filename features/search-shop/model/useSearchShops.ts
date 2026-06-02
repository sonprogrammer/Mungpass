import { searchShops } from "@/features/search-shop/api";
import { useQuery } from "@tanstack/react-query";



export function useSearchShops(keyword: string){
    return useQuery({
        queryKey: ['searchShops', keyword],
        queryFn: () => searchShops(keyword),
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 15,
        enabled: !!keyword && keyword.trim() !== ''
    })
}