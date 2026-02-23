'use client'

import { saveApi } from "@/entities/place/api/saveApi"
import { Favorites } from "@/entities/place/model/types"
import { supabaseClient } from "@/shared/api/supabase/client"
import { KakaoPlace } from "@/shared/model/map"
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const useToggleSaveList = () => {
    const supabase = supabaseClient()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (place: KakaoPlace) => {
            const { data: { user } } = await supabase.auth.getUser()
            console.log('user', user)
            if (!user) throw new Error('you need to login first')

            const { data: existing } = await supabase
                .from('favorites')
                .select('id')
                .eq('user_id', user.id)
                .eq('shop_id', place.id)
                .maybeSingle()

            const isExist = !!existing
            
            const result = await saveApi.toggleSave(user.id, place, isExist)
            console.log('result', result)
            return result
            
        },

        // * 낙관적 업데이틀
        onMutate: async (place) => {
            await queryClient.cancelQueries({ queryKey: ['favorites'] })

            const previousSave = queryClient.getQueryData<Favorites[]>(['favorites'])

            queryClient.setQueryData<Favorites[]>(['favorites'], (old) => {
                if(!old) return []
                const isExist = old.some(list => list.shop_id === place.id)
                if (isExist) {
                    return old.filter(list => list.shop_id !== place.id)
                }

                // * 낙관적 업데이트를위한 중요 데이터 제외, 임시데이터 삽입
                return [...old, {
                    id: Date.now().toString(),
                    user_id: 'user',
                    shop_id: place.id,
                    shop_name: place.place_name,
                    category_name: place.category_name,
                    address: place.address_name,
                    place_url: place.place_url,
                    phone: place.phone ?? null,
                    created_at : new Date().toISOString()
                }]
            })
            return { previousSave }
        },
        onError: (err, _, context) => {
            queryClient.setQueryData(['favorites'], context?.previousSave)
            alert(err.message)
        },
        
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites'] })
        },

    })
}

