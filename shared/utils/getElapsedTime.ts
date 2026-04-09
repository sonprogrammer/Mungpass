// * 남은 시간 보여주는거

import { differenceInMinutes, parseISO } from "date-fns";

export const getElapsedTime = (startedAt: string | null | undefined, endedAt: string | null | undefined) => {
    if(!startedAt) return ''
    const start = parseISO(startedAt)
    
    const endPoint = endedAt ? parseISO(endedAt) : new Date()

    const totalMins = differenceInMinutes(endPoint, start)

    const hours = Math.floor(totalMins / 60)
    const mins = totalMins % 60

    const suffix = endedAt ? "이용" : "경과"

    if(hours === 0) return `${mins}분 ${suffix}`
    return `${hours}시간 ${mins}분 ${suffix}`
}