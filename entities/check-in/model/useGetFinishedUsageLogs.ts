
import { getCurrentUsageLogs } from "@/entities/check-in/api";
import { useGetShopInfo, useOwnerStoreStatus } from "@/entities/owner/model";
import { useQuery } from "@tanstack/react-query";


export function useGetFinishedUsageLogs() {
    // * 현재 승인된매장인지 확인
    const isVerified = useOwnerStoreStatus(state => state.isVerified)

    const { data: shopInfo } = useGetShopInfo()
    const shopId = shopInfo?.id
    return useQuery({
        queryKey: ['currentLogs', shopId, 'finish'],
        queryFn: () => getCurrentUsageLogs(shopId, ['completed', 'cancelled']),
        enabled: !!shopId && isVerified,
        initialData: []
    })
}