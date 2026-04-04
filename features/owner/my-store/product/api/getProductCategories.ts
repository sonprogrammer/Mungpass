import { ProductCategory } from "@/features/owner/my-store/product/model/types";
import { supabaseClient } from "@/shared/api/supabase/client";

export const getProductCategories = async(shopId: string):Promise<ProductCategory[]> => {
    const {data, error} = await supabaseClient.from('product_categories').select('*')
                                            .eq('store_id', shopId)
                                            .order('created_at', {ascending: true})

    if(error){ 
        console.error('상품 카테고리 목록 가져오기실패api', error)
        throw error
    }

    return (data || []) as ProductCategory[]
}