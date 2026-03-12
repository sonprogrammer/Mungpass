import { supabaseClient } from "@/shared/api/supabase/client";

export async function checkEmail(email: string){
    const supabase = supabaseClient

    const { data, error} = await supabase.from('profiles').select('email').eq('email', email).maybeSingle()


    

    if(error){
        console.log('db error', error)
        throw error
    }

    return data ? 'taken' : 'available'
}