import { useOwnerStoreStatus } from "@/entities/owner/model/useOwnerStoreStatus";
import { getAiInsight } from "@/features/owner/stats/api/getAiInsight";
import { StatsDataToAi } from "@/features/owner/stats/model/types";
import { useQuery } from "@tanstack/react-query";


export function useGetAiInsight(statsData: StatsDataToAi, dataReadyForAi: boolean) {
    // * 매장 승인 상태 
    const isVerified = useOwnerStoreStatus(state => state.isVerified)

    const shopId = statsData.shop_id
    return useQuery({
        queryKey: ['ai-insight', shopId],
        queryFn: () => getAiInsight(statsData),
        enabled: dataReadyForAi && isVerified
    })
}