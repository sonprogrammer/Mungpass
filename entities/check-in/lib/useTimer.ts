

import { useTimerProps } from "@/entities/check-in/model/types";
import { useEffect, useState } from "react";



export const useTimer = ({
    startedAt,
    expectedEndAt,
    endedAt,
    gracePeriodMins = 0,
    overtimePolicy
}: useTimerProps) => {
    const [now, setNow] = useState(new Date())

    useEffect(() => {
        if(endedAt) return
        // * 1분마다
        const timer = setInterval(() => setNow(new Date()), 60 * 1000)
        return () => clearInterval(timer)
    },[startedAt, expectedEndAt, endedAt])

    // * 체크인 시간
    const start = new Date(startedAt).getTime()
    //* 체크아웃 예정시간, 이용중이면 예정 종료 시간->상품시간에 나와있는 체크 아웃시간 (예 : 3시간짜리고 7시에 체크인했으면 10시임)
    const expectedEnd = new Date(expectedEndAt).getTime()
    // * 체크아웃 되었으면 실제 종료 시간
    const actualEnd = endedAt ? new Date(endedAt).getTime() : null
    //*현재 시간
    const current = actualEnd || now.getTime()

    // * 상품 이용 시간
    const productDuration = expectedEnd - start

    // *현재 시간 - 예정된 시간 --> 양수면 초과 음수면 아직 초과아님
    const diffMs = current - expectedEnd
    // *실제 초과된 시간 계산
    const totalOverMins = diffMs > 0 ? Math.floor(diffMs / 60000) : 0

    const diffMins = Math.floor(Math.abs(diffMs) / 60000)
    
    // 
    
    // *초과 여부
    const isOverTime = totalOverMins > gracePeriodMins

    
    let progress = 0
    if(diffMs > 0){
        const overTimePassed = current - expectedEnd
        progress = Math.min(overTimePassed / productDuration, 1)
    }else{
        const passed =current - start
        progress = Math.min(passed /productDuration, 1)
    }


    // * 초과시 추가 요금
    let extraCharge = 0
    if(isOverTime && overtimePolicy){
        const chargeableMins = totalOverMins - gracePeriodMins
        const units = Math.ceil(chargeableMins / overtimePolicy.unitMins)
        extraCharge = units * overtimePolicy.unitPrice
    }
    

    return { progress, isOverTime, displayMins: diffMins , extraCharge}
}