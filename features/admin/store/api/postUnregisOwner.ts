'use server'

import { Shop } from "@/entities/admin/inquiry/model";
import { supabaseServer } from "@/shared/api/supabase/server";


export const postUnreigisOwner = async(values:Shop) => {
    const supabase = await supabaseServer()

    const payload = {
        ...values,
        status: 'verified',
    }

    const { data, error } = await supabase
        .from('shops')
        .insert([payload])

    if(error){
        console.error('회원 수동등록 api error', error)
        throw error
    }

    return data
}