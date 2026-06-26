
import { getCurrentStoreStatus } from "@/features/owner/my-store/lib";
import { useGetSchedule, useGetTodayTempStatus, useGetVacation } from "@/features/owner/my-store/model";
import { useEffect, useState } from "react";

export function useShopStatus(shopId: string) {
    const [now, setNow] = useState(new Date())

    useEffect(() => {
        // * 가게 마감 오픈 시간을 위해 1분마다 타이머를 줘서 바로 처리하게
        const timer = setInterval(() => {
            setNow(new Date())
        }, 60000)
        return () => clearInterval(timer)
    }, [])
    
    const { data: schedules, isPending: isSchedulePending } = useGetSchedule(shopId || '')
    const { data: vacation, isPending: isVacationPending } = useGetVacation(shopId || '')
    const { data: tempStatus , isPending: isTempStatusPending} = useGetTodayTempStatus(shopId);

    const isPending = isSchedulePending || isVacationPending || isTempStatusPending
    
    if (isPending || !shopId) {
        return { status: '로딩 중...', isPending: true }
    }

    const currentStatus = getCurrentStoreStatus(schedules || [], vacation ?? undefined, tempStatus ?? undefined, now)

    return {
        ...currentStatus,
        isPending: false
    }
}