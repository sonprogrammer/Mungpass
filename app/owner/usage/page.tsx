'use client'

import { mockCurrentUsageLog } from "@/entities/check-in/model/mockup";
import { useGetCurrentUsageLogs } from "@/entities/check-in/model/useGetCurrentUsageLogs";
import { useGetFinishedUsageLogs } from "@/entities/check-in/model/useGetFinishedUsageLogs";
import { UsageTabs } from "@/features/owner/ui/UsageTabs";
import { CurrentLogList } from "@/widgets/owner/ui/CurrentLogList";
import { useState } from "react";

export default function UsagePage() {
    const [tab, setTab]= useState<'current' | 'checkout'>('current')

    // *실시간 유저
    const { data: currentLogs=[] } = useGetCurrentUsageLogs()
    // *퇴실한 유저
    const { data:checkoutLogs=[]} = useGetFinishedUsageLogs()


    //목업 데이터 
      const mockupData = mockCurrentUsageLog
   
    
    return(
        <div className="h-full flex flex-col p-6"> 
            <UsageTabs activeTab={tab} onChange={setTab} currentCount={currentLogs.length} checkoutCount={checkoutLogs.length}/>
            <div className="flex-1 overflow-hidden mt-3">
              {tab === 'current' ? (
                <CurrentLogList data={currentLogs} tab={tab}/>

              ): (
                <CurrentLogList data={checkoutLogs} tab={tab}/>
              )}
            </div>
        </div>
    )
}