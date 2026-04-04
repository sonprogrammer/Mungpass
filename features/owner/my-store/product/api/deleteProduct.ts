import { supabaseClient } from "@/shared/api/supabase/client";

export const deleteProduct = async({productId, shopId}: {productId: string, shopId: string}) => {
    const { error} = await supabaseClient.from('store_products').delete().eq('id', productId)
                                                                .eq('store_id', shopId)

    if(error){
        console.error('상품 삭제중 에러 발생api', error)
        throw error
    }

    return true
}