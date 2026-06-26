'use server'

import { ScheduleRow } from "@/features/owner/my-store/model";
import { supabaseServer } from "@/shared/api/supabase/server";
import { ApiRes } from "@/shared/model";

export const updateSchedule = async ({ schedules }: { schedules: ScheduleRow[] }): Promise<ApiRes<ScheduleRow[]>> => {
    try {

        const supabase = await supabaseServer()

        const { data: { user }, error: userError } = await supabase.auth.getUser()

        if (userError || !user) {
            return { success: false, message: '인증되지 않은 사용자입니다' }
        }

        const { data: shopInfo, error: shopError } = await supabase.from('shops').select('id').eq('owner_id', user.id).single()

        if (shopError || !shopInfo) {
            return { success: false, message: '매장 정보를 찾을 수 없습니다.' }
        }

        const payload = schedules.map(item => {
            return {
                ...item,
                shop_id: shopInfo.id
            }
        })

        const { data, error } = await supabase.from('shop_schedules')
            .upsert(payload, {
                onConflict: 'shop_id, day_of_week'
            })
            .select()

        if (error) {
            throw error
        }
        return {success: true, data}
    } catch (error) {
        console.error('영업시간 저장 오류', error)
        return { success: false, message: '영업시간 저장 실패'}
    }
}