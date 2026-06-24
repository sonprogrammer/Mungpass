
import { supabaseClient } from "@/shared/api/supabase/client";

export async function regularLogin(formData:FormData){
    const supabase = supabaseClient()
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const role = formData.get('role') as string


    const { data, error} = await supabase.auth.signInWithPassword({
        email,
        password
    })

    
    if(error){
        console.error('erorr', error.message)
        let msg = '로그인 정보를 확인해주세요'
        if(error.message.toLowerCase().includes('email not confirmed')){
            msg ='이메일 인증을 완료해주세요. 메일함을 확인해주세요'
        }else if(error.message.toLowerCase().includes('invalid login credentials')){
            msg = '이메일 또는 비밀번호가 일치하지 않습니다'
        }

        throw error
    }


    const { data: profile, error: profileError} = await supabase.from('profiles').select('role').eq('id', data.user.id).single()

    if(profileError || !profile){
        console.error('상세 에러 내역', profileError)
        await supabase.auth.signOut()
        throw profileError
    }

    if(profile.role === 'admin'){
        return{...data, actualRole: 'admin'}
    }

    if(profile.role !== role){
        await supabase.auth.signOut()
    }
    
    return { ...data, actualRole: profile.role }
}