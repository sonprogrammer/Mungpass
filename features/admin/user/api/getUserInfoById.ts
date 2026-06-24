import { supabaseClient } from "@/shared/api/supabase/client";

export const getUserInfoById = async(userId: string) => {
    const supabase = supabaseClient()

    const { data, error} = await supabase.from('profiles').select(`*, shop:shops(*), store_registrations:store_registrations(*)`)
                                                        .eq('id', userId).single()
    if(error){
        console.error('유저아이디로 유저 정보 불러오기 실패 api error', error)
        throw error
    }
    return data
}