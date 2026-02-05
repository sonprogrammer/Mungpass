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

            // const saveList = queryClient.getQueryData<Favorites[]>(['favorites']) || []
            // console.log('saveList', saveList)

            // //* 현재 보고 있는 상점이 저장되어있나 확인
            // const isExist = saveList?.some(list => String(list.shop_id) === String(place.id))
            // console.log('isExist', isExist)

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

            queryClient.setQueryData(['favorites'], (old: Favorites[] = []) => {
                const isExist = old.some(list => list.shop_id === place.id)
                if (isExist) {
                    return old.filter(list => list.shop_id !== place.id)
                }
                return [...old, {
                    shop_id: place.id,
                    shop_name: place.place_name,
                    category_name: place.category_name,
                    address: place.address_name,
                    place_url: place.place_url
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

