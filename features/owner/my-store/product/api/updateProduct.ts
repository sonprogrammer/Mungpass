'use server'

import { UpdateProductData } from "@/features/owner/my-store/product/model";
import { supabaseServer } from "@/shared/api/supabase/server";

export const updateProduct = async (data: { productId: string, updatedData: UpdateProductData }) => {


    const supabase = await supabaseServer()

    const { data: updateProduct, error } = await supabase.from('store_products').update(data.updatedData).eq('id', data.productId).single()

    if (error) {
        console.error('상품 업데이트 api error', error)
        throw error
    }

    return updateProduct

}