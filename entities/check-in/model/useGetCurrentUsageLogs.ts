// *사장 전용임 

import { getCurrentUsageLogs } from "@/entities/check-in/api";
import { useGetShopInfo, useOwnerStoreStatus } from "@/entities/owner/model";
import { useQuery } from "@tanstack/react-query";


export function useGetCurrentUsageLogs() {
    const { data: shopInfo } = useGetShopInfo()
    const shopId = shopInfo?.id
    // * 현재 승인된매장인지 확인
    const isVerified = useOwnerStoreStatus(state => state.isVerified)
    return useQuery({
        queryKey: ['currentLogs', shopId, 'staying'],
        queryFn: () => getCurrentUsageLogs(shopId, ['staying']),
        enabled: !!shopId && isVerified,
        initialData: []
    })
}