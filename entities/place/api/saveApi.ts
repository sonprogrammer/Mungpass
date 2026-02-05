import { supabaseClient } from '@/shared/api/supabase/client';
import { KakaoPlace } from '@/shared/model/map';



export const saveApi = {
    
    // *저장목록 가져오기 id로
    fetchSaveList: async (userId: string) => {
        const supabase = supabaseClient()
        const { data, error} = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', userId)
        
        if(error){ 
            console.log('fetchSaveList Error', error)
            throw new Error('theere is no userinof')
        }
            return data
    },
    
    // * 저장하기 토글
    toggleSave: async(userId: string, place: KakaoPlace, isExist: boolean) => {
        const supabase = supabaseClient()

        if(isExist){
            console.log('❌ 삭제');
            const {error} = await supabase.from('favorites')
                                          .delete()
                                          .eq('user_id', userId)
                                          .eq('shop_id', place.id)
            if(error) {
                console.log('toggleSave failed', error.message)
                throw error
            }
        }else{
            console.log('✅ 추가');
            const {error} = await supabase.from('favorites')
                                          .insert({
                user_id: userId,
                shop_id: place.id,
                shop_name: place.place_name,
                category_name: place.category_name,
                address: place.address_name,
                place_url: place.place_url
            })
            if(error) {
                console.log('toggleSave Error', error)
                throw new Error('cant toggle')
            }
        }
        
    }
}
