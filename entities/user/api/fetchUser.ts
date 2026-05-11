
import { supabaseClient } from "@/shared/api/supabase/client";

export const fetchUser = async() => {
    const supabase = supabaseClient()

    const { data: {user}} = await supabase.auth.getUser()
    if(!user) return null

    const { data, error} = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    if(error){
        console.error(error)
        return null
    }
    return data
}

