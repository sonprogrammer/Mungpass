import { supabaseClient } from '@/shared/api/supabase/client';
import { KakaoPlace } from '@/shared/model/map';



export const saveApi = {

    // *저장목록 가져오기 id로
    fetchSaveList: async (userId: string) => {
        const supabase = supabaseClient()
        const { data, error } = await supabase
            .from('favorites')
            .select('*')
            .eq('user_id', userId)

        if (error) {
            console.error('fetchSaveList Error', error)
            throw new Error('theere is no userinof')
        }
        return data
    },

    // * 저장하기 토글
    toggleSave: async (userId: string, place: KakaoPlace) => {
        const supabase = supabaseClient()

        const { error: deleteError, count } = await supabase.from('favorites')
            .delete({count: 'exact'})
            .eq('user_id', userId)
            .eq('kakao_place_id', place.id)
            
            if (deleteError) {
            console.error('toggleSave failed', deleteError.message)
            throw deleteError
        } 
        

        
        if(count === 0){
        const { error: insertError } = await supabase.from('favorites')
            .insert({
                user_id: userId,
                kakao_place_id: place.id,
                shop_name: place.place_name,
                category_name: place.category_name,
                address: place.address_name,
                place_url: place.place_url,
                phone: place.phone,
            })
        if (insertError) {
            console.error('toggleSave Error', insertError)
            throw new Error('cant toggle')
        }
    }

}
}
