import { Shop } from "@/entities/admin/inquiry/model";
import { supabaseClient } from "@/shared/api/supabase/client";


export const postUnreigisOwner = async(values:Shop) => {
    const supabase = supabaseClient()

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