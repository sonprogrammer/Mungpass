import { supabaseClient } from "@/shared/api/supabase/client";
import { format } from "date-fns";

export const getMonths = async(shopId: string): Promise<string[]>=> {
    const { data, error} = await supabaseClient.rpc('get_monthly_data',{
        target_shop_id: shopId
    })

    if(error){
        console.error('샵에 대한 월 데이터 가져오기에러', error)
        throw error
    }


    //* db에서 가져온 월 리스트 
    const dbMonths = data?.map((item: {month: string}) => item.month) || []

    // *현재달
    const currentMonth = format(new Date(), 'yyyy-MM')

    // *현재달이 4월1일이고 아직까지 매출이없어도 표시하기 위함
    if(!dbMonths.includes(currentMonth)){
        return [currentMonth, ...dbMonths]
    }
    
    return dbMonths
}