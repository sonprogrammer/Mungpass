'use server'

import { supabaseServer } from "@/shared/api/supabase/server";
import { ApiRes } from "@/shared/model";
import { format } from "date-fns";

export interface TodayTempStatusFromDB {
  id: string
  shop_id: string
  target_date: string
  status_type: 'SHUTDOWN' | 'EARLY_CLOSE'
  reason?: string
  created_at: string
}


export const getTodayTempStatus = async(shopId: string):Promise<ApiRes<TodayTempStatusFromDB | null>> => {
    try {
        
        
        const supabase = await supabaseServer()
        
        const today = new Date()
        const todayStr = format(today, 'yyyy-MM-dd')
        
        const { data, error} = await supabase.from('shop_temp_status').select('*')
        .eq('shop_id', shopId)
        .eq('target_date', todayStr)
        .maybeSingle()
        
        if(error){
            throw error
        }
        
        return {success: true, data}
    } catch (error) {
        console.error('오늘 임시 휴무 데이터 가져오기 에러: ', error)
        return { success: false, message:'임시 상태를 불러오지 못했습니다.'}
    }
}