import { getCurrentStoreStatus } from "@/features/owner/my-store/lib/getCurrentStoraStatus";
import { useGetSchedule } from "@/features/owner/my-store/model/useGetSchedule";
import { useGetTodayTempStatus } from "@/features/owner/my-store/model/useGetTodayTempStatus";
import { useGetVacation } from "@/features/owner/my-store/model/useGetVacation";

export function useShopStatus(shopId: string) {
    const { data: schedules, isPending: isSchedulePending } = useGetSchedule(shopId || '')
    const { data: vacation, isPending: isVacationPending } = useGetVacation(shopId || '')
    const { data: tempStatus , isPending: isTempStatusPending} = useGetTodayTempStatus(shopId);

    const isPending = isSchedulePending || isVacationPending || isTempStatusPending
    
    if (isPending || !shopId) {
        return { status: '로딩 중...', isPending: true }
    }

    const currentStatus = getCurrentStoreStatus(schedules || [], vacation || null, tempStatus)

    return {
        ...currentStatus,
        isPending: false
    }
}