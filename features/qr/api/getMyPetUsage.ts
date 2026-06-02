import { UsageLogStatus } from "@/entities/check-in/model";
import { MyPetUsageAllInfo } from "@/features/qr/model";
import { supabaseClient } from "@/shared/api/supabase/client";

export const getMyPetUsage = async({userId, statuses=['staying']}: {userId: string, statuses: UsageLogStatus[]}):Promise<MyPetUsageAllInfo[]> => {
    const supabase = supabaseClient()
    
    const { data, error} = await supabase.from('usage_logs').select(`*,
                                                    dog: dogs(*),
                                                    product: store_products(*),
                                                    shop: shops(name)
                                                    
                                                `)
                                                .eq('user_id', userId)
                                                .in('status', statuses)
                                                .order('started_at', {ascending: false})
                                            
    if(error){
        console.error('나의 강아지 체크인 정보 가져오기 error', error)
        throw new Error('체크인 한 강아지 정보를 불러오지 못했습니다')
    }

    return (data as MyPetUsageAllInfo[]) || []

}