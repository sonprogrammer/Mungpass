import { ProductCategory } from "@/features/owner/my-store/product/model";
import { supabaseClient } from "@/shared/api/supabase/client";

export const postProductCategory = async({categoryName, shopId} : {categoryName: string, shopId: string}): Promise<ProductCategory> => {
    const supabase = supabaseClient()
    const { data, error } = await supabase.from('product_categories').insert({name: categoryName, store_id: shopId})
                                                .select()
                                                .single()

    if(error){
        console.error('카테고리 생성오류api',error)
        throw error
    }

    return data as ProductCategory
}