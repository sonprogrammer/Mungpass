'use server'
import { ApiRes } from '@/shared/model';
import { supabaseServer } from "@/shared/api/supabase/server";
import { format } from "date-fns";

export const getMonths = async (shopId: string): Promise<ApiRes<string[]>> => {
    try {
        const supabase = await supabaseServer()

        const { data, error } = await supabase.rpc('get_monthly_data', {
            target_shop_id: shopId
        })

        if (error) {
            throw error
        }


        //* db에서 가져온 월 리스트 
        const dbMonths = data?.map((item: { month: string }) => item.month) || []

        // *현재달
        const currentMonth = format(new Date(), 'yyyy-MM')

        // *현재달이 4월1일이고 아직까지 매출이없어도 표시하기 위함
        const months = dbMonths.includes(currentMonth)
            ? dbMonths
            : [currentMonth, ...dbMonths];

        return {success: true, data: months}
    } catch (error) {
        console.error('샵에 대한 월 데이터 가져오기에러', error)
        return { success: false, message: '월 데이터를 불러오지 못했습니다.' }
    }
}