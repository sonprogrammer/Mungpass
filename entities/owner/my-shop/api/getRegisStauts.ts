import { supabaseClient } from "@/shared/api/supabase/client"

export const getRegisData = async(userId: string) => {
    const supabase = supabaseClient()
    
    const { data, error} = await supabase.from('store_registrations')
        .select('*')
        .eq('owner_id', userId)
        .order('created_at', {ascending: false})
        .limit(1)
        .single()

    if(error){
        console.error('신청내역 가져오기 오류', error)
        throw error
    }

    return data
}