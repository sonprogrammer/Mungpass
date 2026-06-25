'use server'

import { supabaseServer } from "@/shared/api/supabase/server";


export const getShopInfo = async(ownerId :string) => {
    const supabase = await supabaseServer()

    const { data, error} = await supabase.from('shops').select('*').eq('owner_id', ownerId).single()

    if(error){
        console.error('shop inofo api eerorr', error.message)
        return { success: false, message: '가게 정보를 불러올 수 없습니다.'}
    }
    // console.log('data from getshopInfo', data)

    return {success: true, data}
}