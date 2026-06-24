import { UpdateProductData } from "@/features/owner/my-store/product/model";
import { supabaseClient } from "@/shared/api/supabase/client";

export const updateProduct = async(data: {productId: string, updatedData: UpdateProductData}) => {
    const supabase = supabaseClient()

    const { data: updateProduct, error } = await supabase.from('store_products').update(data.updatedData).eq('id', data.productId)
    
    if(error){
        console.error('상품 업데이트 api error', error)
        throw error
    }

    return updateProduct
}