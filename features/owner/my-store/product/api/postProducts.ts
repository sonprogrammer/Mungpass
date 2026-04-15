import { Product, ProductSubmitData } from "@/features/owner/my-store/product/model/types";
import { supabaseClient } from "@/shared/api/supabase/client";


export const postProduct = async({shopId, productData}:{shopId: string, productData: ProductSubmitData}):Promise<Product> =>{
    
    const { data ,error } = await supabaseClient.from('store_products').insert({...productData, store_id: shopId})
                                            .select()
                                            .single()

    if(error){
        console.error('상품 등록중 에러 발생api', error)
        throw error
    }


    return data as Product
                                            
}