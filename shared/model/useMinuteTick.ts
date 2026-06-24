import { useEffect, useState } from "react";

let tick = 0
const subscribers = new Set<(tick: number) => void>()

setInterval(() => {
    tick++
    subscribers.forEach((callbcak) => callbcak(tick))
}, 60000)

export function useMinuteTick() {
    const [,setTick] = useState(0)
    useEffect(() => {
        const callback = (t: number) => setTick(t)
        subscribers.add(callback)
        return () => { 
            subscribers.delete(callback)
        }
})
}