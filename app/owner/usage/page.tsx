'use client'


import { useGetCurrentUsageLogs } from "@/entities/check-in/model/useGetCurrentUsageLogs";
import { useGetFinishedUsageLogs } from "@/entities/check-in/model/useGetFinishedUsageLogs";
import { UsageTabs } from "@/features/owner/ui/UsageTabs";
import { CurrentLogList } from "@/widgets/owner/ui/CurrentLogList";
import { useState } from "react";

export default function UsagePage() {
    const [tab, setTab]= useState<'current' | 'checkout'>('current')

    // *실시간 유저
    const { data: currentLogs=[], isPending: isCurrentPending} = useGetCurrentUsageLogs()
    // *퇴실한 유저
    const { data:checkoutLogs=[], isPending: isFinishedPending} = useGetFinishedUsageLogs()


    
    return(
        <div className="h-full flex flex-col p-6"> 
            <UsageTabs activeTab={tab} onChange={setTab} currentCount={currentLogs.length} checkoutCount={checkoutLogs.length}/>
            <div className="flex-1 overflow-hidden mt-3">
              {tab === 'current' ? (
                <CurrentLogList data={currentLogs} tab={tab} isPending={isCurrentPending}/>

              ): (
                <CurrentLogList data={checkoutLogs} tab={tab} isPending={isFinishedPending}/>
              )}
            </div>
        </div>
    )
}