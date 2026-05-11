import { supabaseClient } from "@/shared/api/supabase/client";

export async function registerPrimaryDog({dogId, userId, currentPrimary}: {dogId: string, userId: string, currentPrimary: boolean}) {
    const supabase = supabaseClient()

    // *우선 유저의 모든 애완견 대표 설정을 false로 만듦
    const {error: primaryError} = await supabase.from('dogs').update({is_primary: false}).eq('owner_id', userId)

    if(primaryError) throw primaryError

    //* 원래 대표 강아지가 아니고 지금 대표 설정하는거면 그 강아지만 is_primary=true로,
    //*대표강아지 였으면 위에서 false로 다 만들어놨으니깐 끝
    if(!currentPrimary){
        const { data, error: registerError} = await supabase.from('dogs').update({is_primary: true}).eq('id', dogId).select().single()
        if(registerError) throw registerError
        return data
    }

    return null
}