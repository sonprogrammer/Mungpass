
import { supabaseClient } from "@/shared/api/supabase/client";

export const kakaologin = async() => {
    const supabase = supabaseClient()
    const next = new URLSearchParams(window.location.search).get('next')
    const callbackUrl = new URL('/api/auth/callback', window.location.origin)

    if(next){
        const target = new URL(next, window.location.origin)
        if(target.origin === window.location.origin && target.pathname === '/home'){
            callbackUrl.searchParams.set('next', `${target.pathname}${target.search}`)
        }
    }
    
    
    const {error} = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
            redirectTo: callbackUrl.toString()
        }
    })
    if(error){
        console.error('error', error.message)
    }
}