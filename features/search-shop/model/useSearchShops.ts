import { searchShops } from "@/features/search-shop/api/searchShops";
import { useQuery } from "@tanstack/react-query";



export function useSearchShops(keyword: string, options?: {enabled?: boolean}){
    return useQuery({
        queryKey: ['searchShops', keyword],
        queryFn: () => searchShops(keyword),
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 15,
        enabled: (options?.enabled !== false) && (!!keyword && keyword.trim() !== '')
    })
}