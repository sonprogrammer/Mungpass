'use client'

import { supabaseClient } from "@/shared/api/supabase/client"

export const getTodayVisitCount = async(shopId: string) =>{
    const supabase = supabaseClient()
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const tomorrw = new Date(today)
    tomorrw.setDate(tomorrw.getDate() + 1)
    
    const { count, error} = await supabase.from('usage_logs').select('*',{count: 'exact', head: true})
                                                .eq('shop_id', shopId)
                                                .gte('started_at',today.toISOString())
                                                .lt('started_at', tomorrw.toISOString())


    if(error){ 
        console.error('에러 발생 : ',error)
        throw new Error('에러 발생')
    }
    
    return count ?? 0
}