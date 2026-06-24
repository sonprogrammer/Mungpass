import { supabaseClient } from "@/shared/api/supabase/client";

export async function deleteDog({userId, dogId}: {userId: string, dogId: string} ) {
    const supabase = supabaseClient()

    if(!userId) return { error: 'login first' }

    const {data, error} = await supabase.from('dogs').delete().eq('id', dogId).select()

    if(error) throw error

    if(!data || data.length === 0){
        console.error('there is no data for deleting, check rls policey')
        return 'can not find deleting data'
    }

}