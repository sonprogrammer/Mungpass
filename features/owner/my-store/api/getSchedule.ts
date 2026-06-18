import { ScheduleRow } from "@/features/owner/my-store/model";
import { supabaseClient } from "@/shared/api/supabase/client";

export const getSchedule = async(shopId: string):Promise<ScheduleRow[]> => {
    const supabase = supabaseClient()
    
    const { data, error} = await supabase.from('shop_schedules').select('*')
                                                .eq('shop_id', shopId)
                                                .order('day_of_week', {ascending: true})

    if(error){
        console.error('매장 영업시간 관리 가져오는 api error', error)
        throw new Error('매장 영업시간 관리 가져오는 api error', { cause: error})
    }
    return (data as ScheduleRow[]) || []

}