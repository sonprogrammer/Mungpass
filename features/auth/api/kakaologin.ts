import { supabaseClient } from "@/shared/api/supabase/client";

export const kakaologin = async() => {
    const supabase = supabaseClient()

    const {error} = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
            redirectTo: `${window.location.origin}/home`
        }
    })
    if(error){
        console.log('error', error.message)
    }
}