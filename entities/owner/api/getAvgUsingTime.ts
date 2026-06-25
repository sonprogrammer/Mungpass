'use server'

import { supabaseServer } from "@/shared/api/supabase/server"
import { ApiRes } from "@/shared/model"
import { endOfDay, startOfDay } from "date-fns"


export const getAvgUsingTime = async (shopId: string): Promise<ApiRes<number>> => {
    const supabase = await supabaseServer()
    const todayStart = startOfDay(new Date()).toISOString()
    const todayEnd = endOfDay(new Date()).toISOString()


    const { data, error } = await supabase.from('usage_logs')
        .select('started_at, ended_at')
        .eq('shop_id', shopId)
        .gte('started_at', todayStart)
        .lt('started_at', todayEnd)

    if (error) {
        console.error('avg using time api error', error.message)
        return { success: false, message: '고객 평균 이용시간을 가져오지 못했습니다.'}
    }

    if (!data || data.length === 0) {
        return { success: true, data: 0}
    }

    const totalTime = data.reduce((acc, log) => {
        const start = new Date(log.started_at).getTime()
        const end = log.ended_at ? new Date(log.ended_at).getTime() : Date.now()
        return acc + (end - start)
    }, 0)

    const avgTime = totalTime / data.length

    return {success: true, data: Math.floor(avgTime / (1000 * 60))}
}