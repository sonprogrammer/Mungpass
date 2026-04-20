'use client'

import { saveApi } from "@/entities/place/api/saveApi"
import { Favorites } from "@/entities/place/model/types"
import { useUserStore } from "@/entities/user/model/useUserStore"
import { KakaoPlace } from "@/shared/model/map"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { App } from "antd"


export const useToggleSaveList = () => {
    const queryClient = useQueryClient()
    const profile = useUserStore(state=> state.profile)
    const userId = profile?.id
    const {message} = App.useApp()

    return useMutation({
        mutationFn: async (place: KakaoPlace) => {
            console.log('userIdddd', userId)
            
            
            const result = await saveApi.toggleSave(userId!, place)
            return result
            
        },

        // * 낙관적 업데이틀
        onMutate: async (place) => {
            await queryClient.cancelQueries({ queryKey: ['favorites'] })
            console.log('onmutate 반응 중',place)

            const previousSave = queryClient.getQueryData<Favorites[]>(['favorites'])

            queryClient.setQueryData<Favorites[]>(['favorites'], (old) => {
                if(!old) return []
                const isExist = old.some(list => list.kakao_place_id === place.id)
                if (isExist) {
                    return old.filter(list => list.kakao_place_id !== place.id)
                }

                // * 낙관적 업데이트를위한 중요 데이터 제외, 임시데이터 삽입
                return [...old, {
                    id: Date.now().toString(),
                    user_id: 'user',
                    kakao_place_id: place.id,
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
            message.error(err.message)
        },
        
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites'] })
        },

    })
}

