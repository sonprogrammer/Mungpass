import { getProducts } from "@/features/owner/my-store/product/api";
import { useQuery } from "@tanstack/react-query";

export function useGetProducts(shopId: string) {
    return useQuery({
        queryKey: ['products', shopId],
        queryFn: () => getProducts(shopId),
        enabled: !!shopId,
        staleTime: 1000 * 60 * 10
    })
}