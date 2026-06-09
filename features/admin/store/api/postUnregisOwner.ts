import { Shop } from "@/entities/admin/inquiry/model";
import { supabaseClient } from "@/shared/api/supabase/client";


export const postUnreigisOwner = async(values:Shop) => {
    const supabase = supabaseClient()
    console.log('valuesfdsaf', values)

    const payload = {
        ...values,
        status: 'verified',
    }

    const { data, error } = await supabase
        .from('shops')
        .insert([payload])

    if(error){
        console.error('회원 수동등록 api error', error)
        throw new Error('회원 수동 등록 api errro')
    }

    return data
}