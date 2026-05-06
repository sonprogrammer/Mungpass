import { CurrentUsageLog, UsageLogStatus } from "@/entities/check-in/model/types";
import { supabaseClient } from "@/shared/api/supabase/client";

export const getCurrentUsageLogs = async(myShopId: string, statuses: UsageLogStatus[]):  Promise<CurrentUsageLog[]>=> {
    const supabase = supabaseClient

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
            return []
        }
        return (data ?? []) as CurrentUsageLog[]
}