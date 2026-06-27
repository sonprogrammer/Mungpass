
import { supabaseClient } from "@/shared/api/supabase/client";

export async function signup(formData: FormData) {
    const supabase = supabaseClient()

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

    if (error) {
        let message = '회원가입에 실패했습니다.'
        if (error.message.includes("at least 6 characters")) {
            message = "비밀번호는 최소 6자 이상이어야 합니다."
        }

        if (error.message.includes('already registered')) {
            message = '이미 사용중인 이메일 입니다'
        }

        return { success: false, message }
    }

    if (!data.user) {
        return {
            success: false,
            message: '유저 생성 실패',
        };
    }


    return { success: true, data: data.user }
}
