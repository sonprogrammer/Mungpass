
import { supabaseClient } from "@/shared/api/supabase/client";

export const deleteProductCategory = async({shopId, categoryId}: {shopId: string, categoryId: string})=>{
    const supabase = supabaseClient()
    
    const { error} = await supabase.from('product_categories').delete().eq('store_id', shopId)
                                        .eq('name', categoryId)

    if(error){
        console.error('카테고리 삭제 에러 api', error)
        throw error
    }
    
    return true
}