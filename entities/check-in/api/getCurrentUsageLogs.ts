'use server'

import { CurrentUsageLog, UsageLogStatus } from "@/entities/check-in/model/types";
import { supabaseServer } from "@/shared/api/supabase/server";
import { ApiRes } from "@/shared/model";

export const getCurrentUsageLogs = async(myShopId: string, statuses: UsageLogStatus[]):  Promise<ApiRes<CurrentUsageLog[]>>=> {
    const supabase = await supabaseServer()

    const { data, error} = await supabase.from('usage_logs').select(`*, 
            dog: dogs(
                name,
                image_url,
                breed,
                weight,
                birth_date,
                description
            ),
            owner: profiles(
            name, phone_number
            ),
            product: store_products(
            name,
            duration_minutes,
            price,
            category: category_id(name ,id)
            )
            `).eq('shop_id', myShopId)
            .in('status', statuses)
            .order('started_at', {ascending: false})

        if(error){
            console.error('getCurrentUsageLogs failed', error)
            return {success: false, message:'최신 기록을 확인할수 없습니다.'}
        }
        return {success: true, data: data ?? []}
}