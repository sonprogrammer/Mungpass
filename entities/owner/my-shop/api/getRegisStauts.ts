'use server'

import { ApiRes } from '@/shared/model';
import { StoreRegistration } from "@/entities/owner/my-shop/model"
import { supabaseServer } from '@/shared/api/supabase/server';

export const getRegisData = async (userId: string): Promise<ApiRes<StoreRegistration>> => {
    try {
        const supabase = await supabaseServer()

        const { data, error } = await supabase.from('store_registrations')
            .select('*')
            .eq('owner_id', userId)
            .order('created_at', { ascending: false })
            .limit(1)
            .single()

        if (error) {
            throw error
        }

        return {success: true, data}
    } catch (error) {
        console.error('신청내역 가져오기 오류', error)
        return { success: false, message: '등록정보 불러오기 실패'}
    }
}