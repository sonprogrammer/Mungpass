'use server'

import { ApiRes } from '@/shared/model';
import { ProductWithCategory } from '@/features/owner/my-store/product/model';
import { supabaseServer } from '@/shared/api/supabase/server';

export const getProducts = async (shopId: string): Promise<ApiRes<ProductWithCategory[]>> => {
    try {

        const supabase = await supabaseServer()
        const { data, error } = await supabase.from('store_products').select(` *, product_categories(id, name)`)
            .eq('store_id', shopId).eq('is_deleted', false)
            .order('created_at', { ascending: false })

        if (error) {
            throw error
        }

        return {success: true, data: data ?? []}
    } catch (error) {
        console.error('상품 가져오기 api 에러', error)
        return { success: false, message:'상품을 불러오지 못했습니다'}
    }
}