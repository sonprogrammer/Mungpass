'use server'

import { supabaseServer } from "@/shared/api/supabase/server";

export const getUnregisOnwer = async() => {
    const supabase = await supabaseServer()

    const { data, error} = await supabase.from('unregistered_owners').select('*')

    if(error){
        console.error('사장 유저 불러오기 실패')
        throw error
    }

    return data
}