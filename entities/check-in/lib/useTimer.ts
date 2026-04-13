import { useEffect, useState } from "react";

interface OvertimePolicy {
    unitMins: number;  
    unitPrice: number; 
}

export const useTimer = (startedAt: string, expectedEndAt: string, endedAt?: string | null, overtimePolicy?: OvertimePolicy) => {
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

    // *초과 여부
    const isOverTime = current >= expectedEnd

    
    let progress = 0
    if(isOverTime){
        const overTimePassed = current - expectedEnd
        progress = Math.min(overTimePassed / productDuration, 1)
    }else{
        const passed =current - start
        progress = Math.min(passed /productDuration, 1)
    }

    // *남은시간 / 초과 시간
    const diffMins = Math.floor(Math.abs(current - expectedEnd) / 60000)
   

    // * 초과시 추가 요금
    let extraCharge = 0
    if(isOverTime && overtimePolicy){
        const units = Math.ceil(diffMins / overtimePolicy.unitMins)
        extraCharge = units * overtimePolicy.unitPrice
    }
    

    return { progress, isOverTime, displayMins: diffMins , extraCharge}
}