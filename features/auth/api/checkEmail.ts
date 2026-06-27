'use server'

import { supabaseServer } from "@/shared/api/supabase/server";
import { ApiRes } from "@/shared/model";

export async function checkEmail(email: string): Promise<ApiRes<boolean>> {
    try {
        const supabase = await supabaseServer()
        
        const { data, error} = await supabase.from('profiles').select('email').eq('email', email).maybeSingle()
        
        if(error){
            throw new Error('요청 실패')
        }
        return {success: true, data: !!data}
    } catch (error) {
        console.error('db error', error)
        return { success: false, message: error instanceof Error ? error.message : '이메일 중복 확인 실패'}
    }
}