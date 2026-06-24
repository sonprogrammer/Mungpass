import { supabaseClient } from "@/shared/api/supabase/client";

// * 유저가 큐알을 스캔했을 때 일어나는 거임
export const userCheckIn = async({dogId, shopId, productId, userId}: {dogId: string, shopId: string, productId: string, userId: string}) => {
    const supabase = supabaseClient()

    //* 유저가 이용중인 상품 정보
    const { data: productInfo, error: productError} = await supabase.from('store_products').select('*')
                                                .eq('id', productId)
                                                .eq('is_active', true)
                                                .single()
                                                
    if(productError){ 
        console.error('현재 스캔후 이용할 상품 정보에러api', productError)
        throw productError
    }

    // * 중복 입실 체크
    const { data: existingLog} = await supabase.from('usage_logs')
                            .select('id')
                            .eq('dog_id', dogId)
                            .eq('status', 'staying')
                            .maybeSingle()

    if(existingLog){
        throw new Error('해당 강아지는 이미 입실중입니다')
    }

    const now = new Date()
    const productsMinutes = productInfo.duration_minutes
    // TODO 토탈 이용시간 = 원래 이용시간에다가 끝난시간
    
    const expectedEndAt = new Date(now.getTime() + productsMinutes * 60000)

    
    const { data : usageLog, error: checkInInsertError} = await supabase.from('usage_logs')
                                                .insert([
                                                    {
                                                        shop_id: shopId,
                                                        product_id: productId,
                                                        user_id: userId,
                                                        dog_id: dogId,
                                                        started_at: now.toISOString(),
                                                        expected_ended_at: expectedEndAt.toISOString(),
                                                        status: 'staying'
                                                    }
                                                ])
                                                .select()
                                                .single()

    if(checkInInsertError){
        console.error('체크인 usagge_logs 인서트 에러', checkInInsertError)
        throw checkInInsertError
    }

    return usageLog
}