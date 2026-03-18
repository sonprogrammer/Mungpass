import { supabaseClient } from "@/shared/api/supabase/client";

export const getShopInfo = async(ownerId :string) => {

    const { data, error} = await supabaseClient.from('shops').select('*').eq('owner_id', ownerId).single()

    if(error){
        console.error('shop inofo api eerorr', error.message)
        throw error
    }

    return data
}