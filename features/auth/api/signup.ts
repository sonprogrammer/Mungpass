
import { supabaseClient } from "@/shared/api/supabase/client";

export async function signup(formData: FormData){
    const supabase = supabaseClient

    const email = (formData.get('email') as string).trim()
    const password = formData.get('password') as string
    const name = formData.get('name') as string
    const phone = formData.get('phone') as string
    const role = formData.get('role') as string

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name: name,
                phone_number: phone,
                role: role
            }
        }
    })

    if(error){

        if (error.message.includes("at least 6 characters")) {
            throw new Error("비밀번호는 최소 6자 이상이어야 합니다.");
       }
       
       if(error.message.includes('already registered')){
        throw new Error('이미 사용중인 이메일 입니다')
       }
       
        console.error('회원가입 에러', error.message)
        throw new Error(error.message)
    }

    // await supabase.auth.signOut()

    return data.user
}