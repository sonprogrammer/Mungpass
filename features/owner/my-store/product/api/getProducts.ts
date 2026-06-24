import { ProductWithCategory } from '@/features/owner/my-store/product/model';
import { supabaseClient } from '@/shared/api/supabase/client';

export const getProducts = async(shopId: string):Promise<ProductWithCategory[]> => {
    const supabase = supabaseClient()
    const { data, error} = await supabase.from('store_products').select(` *, product_categories(id, name)`)
                                                .eq('store_id', shopId).eq('is_deleted', false)
                                                .order('created_at', { ascending: false})
    if(error){ 
        console.error('상품 가져오기 api 에러', error)
        throw error
    }

    return (data || []) as ProductWithCategory[]
}