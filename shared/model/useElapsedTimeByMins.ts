import { useMinuteTick } from "@/shared/model/useMinuteTick";
import { getElapsedTime } from "@/shared/utils";


export function useElapsedTimeByMins(startedAt: string | null | undefined, endedAt: string | null | undefined) {
    // const [elapsedText, setElapsedText] = useState(() => getElapsedTime(startedAt, endedAt))

    // useEffect(() => {
    //     if(endedAt || !startedAt){
    //         setElapsedText(getElapsedTime(startedAt, endedAt))
    //         return
    //     }
    //     setElapsedText(getElapsedTime(startedAt, endedAt))
    //     const timer = setInterval(() => {
    //         setElapsedText(getElapsedTime(startedAt, endedAt))
    //     }, 60000)

    //     return () => clearInterval(timer)
    // },[startedAt, endedAt])

    // return elapsedText
    useMinuteTick()
    return getElapsedTime(startedAt, endedAt)
    
}