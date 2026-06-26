'use server'

import { ApiRes } from '@/shared/model';
import { Product, ProductSubmitData } from "@/features/owner/my-store/product/model";
import { supabaseServer } from "@/shared/api/supabase/server";


export const postProduct = async ({ productData }: { productData: ProductSubmitData }): Promise<ApiRes<Product>> => {
    try {

        const supabase = await supabaseServer()

        const { data: { user }, error: userError } = await supabase.auth.getUser()

        if (userError || !user) {
            return { success: false, message: '인증되지 않은 사용자입니다' }
        }

        const { data: shop, error: shopError } = await supabase
            .from('shops')
            .select('id')
            .eq('owner_id', user.id)
            .single()

        if (shopError || !shop) {
            return { success: false, message: '매장 정보를 찾을 수 없습니다.' }
        }


        const { data, error } = await supabase.from('store_products').insert({ ...productData, store_id: shop.id })
            .select()
            .single()

        if (error) {
            if (error.code === '23505') {
                return {
                    success: false,
                    message: '이미 등록된 상품명입니다.'
                }
            }
            throw error
        }


        return { success: true, data: data as Product }
    } catch (error) {
        console.error('상품 등록중 에러 발생api', error)
        return { success: false, message: '상품 등록 실패' }
    }

}