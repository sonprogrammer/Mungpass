import { getProductCategories } from "@/features/owner/my-store/product/api";
import { useQuery } from "@tanstack/react-query";

export function useGetProductCategories(shopId: string) {
    return useQuery({
        queryKey: ['categories', shopId],
        queryFn: () => getProductCategories(shopId),
        enabled: !!shopId,
        staleTime: 1000 * 60 * 60
    })
}