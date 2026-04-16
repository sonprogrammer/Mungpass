import { supabaseClient } from "@/shared/api/supabase/client"
import { format } from "date-fns"



export const getVacation = async(shopId: string) => {
    const today = format(new Date(), 'yyyy-MM-dd')
    
    const { data, error} = await supabaseClient.from('shop_vacations').select('*')
                                        .eq('shop_id', shopId)
                                        .gte('end_date', today)
                                        .maybeSingle()
    
    if(error){
        console.error('휴가 정보 에러 ', error)
        throw error
    }

    console.log('vacation from api', data)

    return data
}