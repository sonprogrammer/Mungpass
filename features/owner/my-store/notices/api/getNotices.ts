import { NoticeFromDb } from "@/features/owner/my-store/notices/model/types";
import { supabaseClient } from "@/shared/api/supabase/client";

export const getNotices = async(shopId: string):Promise<NoticeFromDb[]> => {
    const supabase = supabaseClient()
    const { data, error} = await supabase.from('shop_notices').select('*').eq('shop_id', shopId)
                                                    .order('created_at', {ascending: false})

    if(error){
        console.error('공지사항 가져오기 에러 api error', error)
        throw error
    }                                                    

    return (data as NoticeFromDb[]) || []
    
}