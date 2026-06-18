import { supabaseClient } from "@/shared/api/supabase/client";

export async function checkEmail(email: string){
    const supabase = supabaseClient()

    const { data, error} = await supabase.from('profiles').select('email').eq('email', email).maybeSingle()


    if(error){
        console.error('db error', error)
        throw new Error('db error', { cause: error})
    }

    return data ? 'taken' : 'available'
}