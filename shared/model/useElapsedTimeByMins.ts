import { getElapsedTime } from "@/shared/utils";
import { useEffect, useState } from "react";


export function useElapsedTimeByMins(startedAt: string | null | undefined, endedAt: string | null | undefined) {
    const [elapsedText, setElapsedText] = useState(() => getElapsedTime(startedAt, endedAt))

    useEffect(() => {
        if(endedAt || !startedAt){
            setElapsedText(getElapsedTime(startedAt, endedAt))
            return
        }
        const timer = setInterval(() => {
            setElapsedText(getElapsedTime(startedAt, endedAt))
        }, 60000)

        return () => clearInterval(timer)
    },[startedAt, endedAt])

    return elapsedText
}