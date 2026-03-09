import { supabaseClient } from "@/shared/api/supabase/client";

export async function regularLogin(formData:FormData){
    const supabase = supabaseClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const role = formData.get('role') as string
    console.log('email', email, password, role)

    const { data, error} = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if(error){
        console.log('erorr', error.message)
        let msg = '로그인 정보를 확인해주세요'
        if(error.message.toLowerCase().includes('email not confirmed')){
            msg ='이메일 인증을 완료해주세요. 메일함을 확인해주세요'
        }else if(error.message.toLowerCase().includes('invalid login credentials')){
            msg = '이메일 또는 비밀번호가 일치하지 않습니다'
        }

        throw new Error(msg)
    }

    const { data: profile, error: profileError} = await supabase.from('profiles').select('role').eq('id', data.user.id).single()

    console.log('profiel', profile)

    if(profileError || !profile){
        throw new Error('사용자 프로필을 찾df을 수 없습니다.')
    }

    if(profile.role === 'admin'){
        return{...data, actualRole: 'admin'}
    }

    if(profile.role !== role){
        throw new Error('선택한 회원 유형이 올바르지 않습니다.')
    }
    
    return { ...data, actualRole: profile.role }
}