import { supabaseClient } from "@/shared/api/supabase/client";

export const deleteProduct = async({productId, shopId}: {productId: string, shopId: string}) => {
    const supabase = supabaseClient()
    
    const { error} = await supabase.from('store_products').update({is_deleted: true}).eq('id', productId)
                                                                .eq('store_id', shopId)

    if(error){
        console.error('상품 삭제중 에러 발생api', error)
        throw new Error('상품 삭제중 에러 발생api', { cause: error})
    }
    

    return true
}