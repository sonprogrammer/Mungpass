import { PostNotice } from "@/features/owner/my-store/notices/model";
import { supabaseClient } from "@/shared/api/supabase/client";


export const saveNotice = async({shopId, noticeId, postData}: PostNotice) => {

    const supabase = supabaseClient()
    
    const { data, error} = await supabase.from('shop_notices')
                                               .upsert({
                                                    ...(noticeId ? {id: noticeId} : {}),
                                                    shop_id: shopId,
                                                    title: postData.title,
                                                    content: postData.content,
                                                    is_show: postData.is_show,
                                                    updated_at: new Date().toISOString()
                                                }).select().single()
    if(error){
        console.error('공지사항 저장 에러 api', error)
        throw error
    }

    return data
}