import { supabaseClient } from "@/shared/api/supabase/client";

export const handleLogout = async() => {
    const supabase = supabaseClient()

    const {error } = await supabase.auth.signOut()

    if(error){
        console.log('error ocure while logout', error.message)
    }else{
        window.location.href = '/'
    }
}