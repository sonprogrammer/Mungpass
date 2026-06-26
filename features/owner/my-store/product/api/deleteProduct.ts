'use server'

import { supabaseServer } from "@/shared/api/supabase/server";
import { ApiRes } from "@/shared/model";

export const deleteProduct = async ({ productId }: { productId: string }): Promise<ApiRes<null>> => {
    try {

        const supabase = await supabaseServer()

        const { data: { user }, error: userError } = await supabase.auth.getUser()

        if (!user || userError) {
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

        const { error } = await supabase.from('store_products').update({ is_deleted: true }).eq('id', productId)
            .eq('store_id', shop.id)

        if (error) {
            throw error
        }


        return { success: true, data: null }
    } catch (error) {
        console.error('상품 삭제중 에러 발생api', error)
        return { success: false, message: '삭제 실패' }
    }
}