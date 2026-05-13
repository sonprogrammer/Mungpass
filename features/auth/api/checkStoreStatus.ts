import { supabaseClient } from "@/shared/api/supabase/client";

export const checkStoreStatus = async(ownerId: string) => {
    console.log('ownerid', ownerId)
    const supabase = supabaseClient()
    const { data, error} = await supabase.from('store_registrations').select('*').eq('owner_id', ownerId).order('created_at', { ascending: false }).limit(1).maybeSingle()

    if(error){
        console.error('매장 등록 상태 확인 api 에러',error)
        throw error
    }

    console.log('data', data)
    
    return data
}