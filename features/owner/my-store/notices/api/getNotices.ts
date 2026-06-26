'use server'

import { ApiRes } from '@/shared/model';
import { NoticeFromDb } from "@/features/owner/my-store/notices/model";
import { supabaseServer } from "@/shared/api/supabase/server";

export const getNotices = async(shopId: string):Promise<ApiRes<NoticeFromDb[]>> => {
    try {
        
        const supabase = await supabaseServer()
        const { data, error} = await supabase.from('shop_notices').select('*').eq('shop_id', shopId)
        .order('created_at', {ascending: false})
        
        if(error){
            throw error
        }                                                    
        
        return {success: true, data : (data as NoticeFromDb[]) || []}
    } catch (error) {
        console.error('공지사항 가져오기 에러 api error', error)
        return { success: false, message: '공지사항을 불러오기 실패'}
    }
    
}