import { supabaseClient } from "@/shared/api/supabase/client";

export const kakaologin = async() => {
    const supabase = supabaseClient()
    
    const {error} = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
            redirectTo: `${window.location.origin}/api/auth/callback`
        }
    })
    if(error){
        console.error('error', error.message)
    }
}