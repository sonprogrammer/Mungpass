'use server'

import { supabaseServer } from "@/shared/api/supabase/server"



export const getTodayVisitCount = async(shopId: string) =>{
    const supabase = await supabaseServer()
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
        return { success: false, message: '오늘 방문자 정보를 가져올 수 없습니다.'}
    }
    
    return {success: true , data: count ?? 0}
}