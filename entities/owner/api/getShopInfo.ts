'use server'

import { supabaseServer } from "@/shared/api/supabase/server";


export const getShopInfo = async(ownerId :string) => {
    const supabase = await supabaseServer()

    const { data, error} = await supabase.from('shops').select('*').eq('owner_id', ownerId).single()

    if(error){
        console.error('shop inofo api eerorr', error.message)
        throw error
    }
    // console.log('data from getshopInfo', data)

    return data
}