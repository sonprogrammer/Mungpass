import { ScheduleRow } from "@/features/owner/my-store/model/types";
import { supabaseClient } from "@/shared/api/supabase/client";

export const updateSchedule = async({shopId,schedules} :{schedules:ScheduleRow | ScheduleRow [], shopId: string}) => {
    const supabase = supabaseClient()
    
    const { data, error } = await supabase.from('shop_schedules')
                            .upsert(schedules,{
                                onConflict: 'shop_id, day_of_week'
                            })
                            .select()
    if(error){
        console.error('영업시간 저장 오류', error)
        throw error
    }

    return data
}