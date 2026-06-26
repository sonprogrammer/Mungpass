'use server'

import { VactationFromDB } from "@/features/owner/my-store/model"
import { supabaseServer } from "@/shared/api/supabase/server"
import { ApiRes } from "@/shared/model"
import { format } from "date-fns"



export const getVacation = async (shopId: string):Promise<ApiRes<VactationFromDB | null>> => {
    try {

        const supabase = await supabaseServer()

        const today = format(new Date(), 'yyyy-MM-dd')

        const { data, error } = await supabase.from('shop_vacations').select('*')
            .eq('shop_id', shopId)
            .gte('end_date', today)
            .maybeSingle()

        if (error) {
            throw error
        }

        return {success: true, data: data ?? null}
    } catch (error) {
        console.error('휴가 정보 에러 ', error)
        return { success: false, message:'휴가 정보를 불러오지 못했습니다.'}
    }
}