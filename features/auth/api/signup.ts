
import { supabaseClient } from "@/shared/api/supabase/client";

export async function signup(formData: FormData){
    const supabase = supabaseClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const name = formData.get('name') as string
    const phone = formData.get('phone') as string

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name: name,
                phone_number: phone
            }
        }
    })

    if(error){
        console.error('회원가입 에러', error.message)
        throw error
    }

    return data
}