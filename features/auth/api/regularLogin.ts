import { supabaseClient } from "@/shared/api/supabase/client";

export async function regularLogin(formData:FormData){
    const supabase = supabaseClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    console.log('email', email, password)

    const { data, error} = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if(error){
        console.error('로그인 에러', error.message)
        throw error
    }
    return data
}