'use server'

import { ApiRes } from '@/shared/model';
import { ScheduleRow } from "@/features/owner/my-store/model";
import { supabaseServer } from "@/shared/api/supabase/server";

export const getSchedule = async (shopId: string): Promise<ApiRes<ScheduleRow[]>> => {
    try {
        const supabase = await supabaseServer()

        const { data, error } = await supabase.from('shop_schedules').select('*')
            .eq('shop_id', shopId)
            .order('day_of_week', { ascending: true })

        if (error) {
            throw error
        }
        return { success: true, data: (data as ScheduleRow[]) || [] }
    } catch (error) {
        console.error('매장 영업시간 관리 가져오는 api error', error)
        return { success: false, message: '영업시간 불러오기 실패' }
    }

}