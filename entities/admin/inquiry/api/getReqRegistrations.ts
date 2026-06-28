'use server'

import { supabaseServer } from "@/shared/api/supabase/server"
import { ApiRes } from "@/shared/model"

export const getReqRegistrations = async (): Promise<ApiRes<number>> => {
    try {

        const supabase = await supabaseServer()

        const { count, error } = await supabase.from('store_registrations').select('*', { count: 'exact', head: true }).eq('status', 'PENDING')

        if (error) {
            throw error
        }
        return { success: true, data: count ?? 0 }
    } catch (error) {
        console.error('승인 대기 매장 수 조회 실패', error)

        return {
            success: false,
            message: '승인 대기 매장 수를 불러오는데 실패했습니다.',
        }
    }
}