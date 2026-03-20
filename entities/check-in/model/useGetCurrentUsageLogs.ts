
import { getCurrentUsageLogs } from "@/entities/check-in/api/getCurrentUsageLogs";
import { useGetShopInfo } from "@/entities/owner/model/useGetShopInfo";
import { useQuery } from "@tanstack/react-query";


export function useGetCurrentUsageLogs() {
    const { data: shopInfo } = useGetShopInfo()
    const shopId = shopInfo?.id
    return useQuery({
        queryKey: ['currentLogs', shopId, 'staying'],
        queryFn: () => getCurrentUsageLogs(shopId, ['staying']),
        enabled: !!shopId
    })
}