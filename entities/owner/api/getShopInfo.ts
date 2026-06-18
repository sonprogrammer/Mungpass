import { supabaseClient } from "@/shared/api/supabase/client";

export const getShopInfo = async(ownerId :string) => {
    const supabase = supabaseClient()

    const { data, error} = await supabase.from('shops').select('*').eq('owner_id', ownerId).single()

    if(error){
        console.error('shop inofo api eerorr', error.message)
        throw new Error('shop inofo api eerorr', {cause: error})
    }

    return data
}