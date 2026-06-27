'use server'
import { ApiRes } from '@/shared/model';
import { UsageLogStatus } from "@/entities/check-in/model";
import { MyPetUsageAllInfo } from "@/features/qr/model";
import { supabaseServer } from "@/shared/api/supabase/server";

export const getMyPetUsage = async ({ statuses = ['staying'] }: { statuses: UsageLogStatus[] }): Promise<ApiRes<MyPetUsageAllInfo[]>> => {
    try {

        const supabase = await supabaseServer()

        const { data: { user}, error: userError} = await supabase.auth.getUser()
        if(userError || !user){
            return { success: false, message: '유효하지 않은 사용자입니다.'}
        }

        const { data, error } = await supabase.from('usage_logs').select(`*,
            dog: dogs(*),
            product: store_products(*),
            shop: shops(name)
            
            `)
            .eq('user_id', user.id)
            .in('status', statuses)
            .order('started_at', { ascending: false })

        if (error) {
            throw error
        }

        return { success: true, data: (data as MyPetUsageAllInfo[]) || []}

    } catch (error) {
        console.error('나의 강아지 체크인 정보 가져오기 error', error)
        return { success :false, message: '체크인정보 불러오기 실패'}
    }
}