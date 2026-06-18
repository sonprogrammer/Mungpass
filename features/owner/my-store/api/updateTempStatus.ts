import { supabaseClient } from "@/shared/api/supabase/client";
import { format } from "date-fns";


// ! 서버에서 타입이 shutdown(즉시휴무), earyly_close(조기마감)임 
export const updateTempStatus = async({shopId, type, reason}:{shopId: string, type: 'SHUTDOWN'|'EARLY_CLOSE', reason: string}) => {
    const supabase = supabaseClient()
    
    const today = new Date()
    const todayStr = format(today, 'yyyy-MM-dd')

    const {data, error} = await supabase.from('shop_temp_status')
                                    .upsert({
                                        shop_id: shopId,
                                        target_date: todayStr,
                                        status_type: type,
                                        reason: reason
                                    },{onConflict: 'shop_id, target_date'})
                                    .select()

    if(error){
        console.error('휴무/마감 업데이트 오류', error)
        throw new Error('휴무/마감 업데이트 오류', { cause: error})
    }

                   
    return data
}