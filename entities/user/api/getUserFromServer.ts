'use server'

import { supabaseServer } from "@/shared/api/supabase/server";

export const getUserFromServer = async() => {
    const supabase = await supabaseServer()

    const { data: {user}} = await supabase.auth.getUser()
    if(!user) return null

    const { data, error} = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    if(error){
        console.error(error)
        throw new Error('로그인 정보를 찾을 수 없습니다.')
    }

    console.log('data from server', data)
    return data
}

