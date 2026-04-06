import { useEffect, useState } from "react";

export const useTimer = (startedAt: string, expectedEndAt: number) => {
    const [now, setNow] = useState(new Date())

    useEffect(() => {
        // * 1분마다
        const timer = setInterval(() => setNow(new Date()), 60 * 1000)
        return () => clearInterval(timer)
    },[])

    // * 체크인 시간
    const start = new Date(startedAt).getTime()
    // * 상품시간에 나와있는 체크 아웃시간 (예 : 3시간짜리고 7시에 체크인했으면 10시임)
    const end = new Date(expectedEndAt).getTime()
    //*현재 시간
    const current = now.getTime()

    // * 전체 이용시간
    const totalDuration = end - start
    //* 경과 시간
    const passed = current - start

    // *초과 여부
    const isOverTime = current >= end

    
    let progress = 0
    if(isOverTime){
        const overTimePassed = (current - end) % totalDuration
        progress = overTimePassed / totalDuration
    }else{
        progress = passed /totalDuration
    }

    const diffMins = Math.floor(Math.abs(current - end) / 60000)
   
    

    return { progress, isOverTime, displayMins: diffMins}
}