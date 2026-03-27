import { supabaseClient } from "@/shared/api/supabase/client"
import { endOfDay, startOfDay } from "date-fns"


export const getAvgUsingTime = async (shopId: string) => {
    const todayStart = startOfDay(new Date()).toISOString()
    const todayEnd = endOfDay(new Date()).toISOString()


    const { data, error } = await supabaseClient.from('usage_logs')
        .select('started_at, ended_at')
        .eq('shop_id', shopId)
        .gte('started_at', todayStart)
        .lt('started_at', todayEnd)

    if (error) {
        console.error('avg using time api error', error.message)
        throw error
    }

    if (!data || data.length === 0) {
        return 0
    }

    const totalTime = data.reduce((acc, log) => {
        const start = new Date(log.started_at).getTime()
        const end = log.ended_at ? new Date(log.ended_at).getTime() : Date.now()
        return acc + (end - start)
    }, 0)

    const avgTime = totalTime / data.length

    return Math.floor(avgTime / (1000 * 60))
}