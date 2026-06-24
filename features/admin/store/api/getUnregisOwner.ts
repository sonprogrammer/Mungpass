import { supabaseClient } from "@/shared/api/supabase/client";

export const getUnregisOnwer = async() => {
    const supabase = supabaseClient()

    const { data, error} = await supabase.from('unregistered_owners').select('*')

    if(error){
        console.error('사장 유저 불러오기 실패')
        throw error
    }

    return data
}