'use client'


import { useGetCurrentUsageLogs } from "@/entities/check-in/model/useGetCurrentUsageLogs";
import { useGetFinishedUsageLogs } from "@/entities/check-in/model/useGetFinishedUsageLogs";
import { useOwnerStoreStatus } from "@/entities/owner/model/useOwnerStoreStatus";
import { UsageTabs } from "@/features/owner/ui/UsageTabs";
import { CurrentLogList } from "@/widgets/owner/ui/CurrentLogList";
import { FinishedLogList } from "@/widgets/owner/ui/FinishedLogList";
import { isToday, parseISO } from "date-fns";
import { useMemo, useState } from "react";

export default function UsagePage() {
    const [tab, setTab]= useState<'current' | 'checkout'>('current')

    // * 현재 승인된매장인지 확인
    const isVerified = useOwnerStoreStatus(state => state.isVerified)

    // *실시간 유저
    const { data: currentLogs=[], isPending: isCurrentPending} = useGetCurrentUsageLogs()
    // *퇴실한 전체 유저
    const { data:checkoutLogs=[], isPending: isFinishedPending} = useGetFinishedUsageLogs()

  const todayCheckoutCount = useMemo(() => {
    return checkoutLogs.filter(log => {
      return log.ended_at ? isToday(parseISO(log.ended_at)) : false
    }).length
  }, [checkoutLogs])
  
    return(
        <div className="h-full flex flex-col p-6"> 
            <UsageTabs activeTab={tab} onChange={setTab} currentCount={currentLogs.length} checkoutCount={todayCheckoutCount}/>
            <div className="flex-1 overflow-hidden mt-3">
              {tab === 'current' ? (
                <CurrentLogList data={currentLogs} tab={tab} isPending={isCurrentPending} isVerified={isVerified}/>

              ): (
                <FinishedLogList data={checkoutLogs} isPending={isFinishedPending} isVerified={isVerified}/>
              )}
            </div>
        </div>
    )
}