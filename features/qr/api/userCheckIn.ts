'use server'

import { supabaseServer } from "@/shared/api/supabase/server";
import { ApiRes } from "@/shared/model";

// * 유저가 큐알을 스캔했을 때 일어나는 거임
export const userCheckIn = async ({ dogId, shopId, productId }: { dogId: string, shopId: string, productId: string }): Promise<ApiRes<null>> => {
    try {

        const supabase = await supabaseServer()

        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError || !user) {
            return { success: false, message: '유효하지 않은 사용자입니다.' }
        }

        //* 유저가 이용중인 상품 정보
        const { data: productInfo, error: productError } = await supabase.from('store_products').select('*')
            .eq('id', productId)
            .eq('is_active', true)
            .single()

        if (productError) {
            throw new Error('상품 정보 불러오기 실패')
        }

        // * 중복 입실 체크
        const { data: existingLog } = await supabase.from('usage_logs')
            .select('id')
            .eq('dog_id', dogId)
            .eq('status', 'staying')
            .maybeSingle()

        if (existingLog) {
            throw new Error('해당 강아지는 이미 입실중입니다')
        }

        const now = new Date()
        const productsMinutes = productInfo.duration_minutes

        const expectedEndAt = new Date(now.getTime() + productsMinutes * 60000)


        const { error: checkInInsertError } = await supabase.from('usage_logs')
            .insert([
                {
                    shop_id: shopId,
                    product_id: productId,
                    user_id: user.id,
                    dog_id: dogId,
                    started_at: now.toISOString(),
                    expected_ended_at: expectedEndAt.toISOString(),
                    status: 'staying'
                }
            ])
            .select()
            .single()

        if (checkInInsertError) {
            console.error('체크인 usagge_logs 인서트 에러', checkInInsertError)
            throw new Error('체크인 정보를 저장하지 못했습니다.')
        }

        return { success: true, data: null }
    } catch (error) {
        console.error('체크인 에러', error)
        return { success: false, message: error instanceof Error ? error.message : '체크인 실패' }
    }
}