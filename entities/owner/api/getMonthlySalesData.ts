'use server'

import { ApiRes } from '@/shared/model';
import { MonthlySalesData } from "@/entities/owner/model";
import { supabaseServer } from '@/shared/api/supabase/server';

export const getMonthlySalesData = async(shopId: string):Promise<ApiRes<MonthlySalesData[]>> => {
    try {
        
        const supabase = await supabaseServer()
        
        const { data, error} = await supabase.rpc('get_monthly_total_sales', {
            target_shop_id: shopId
        })
        
        if(error){
            console.error('연별 데이터를 가져오지 못했습니다', error)
            throw error
        }
        
        return {success: true, data: data as MonthlySalesData[]}
    } catch (error) {
        console.error('연별 데이터를 가져오지 못했습니다', error)
        return {success: false, message: '연별 데이터를 가져오지 못했습니다.'}
    }
}