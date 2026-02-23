'use client'

import { saveApi } from "@/entities/place/api/saveApi"
import { supabaseClient } from "@/shared/api/supabase/client"
import { useQuery } from "@tanstack/react-query"


export const useGetSaveList = () => {
    const supabase = supabaseClient()

    return useQuery({
        queryKey: ['favorites'],
        queryFn: async () => {
            const {data: {user}} = await supabase.auth.getUser()
            if(!user) { console.log('failed'); return []}
            console.log('user.auth', user)
            return saveApi.fetchSaveList(user.id)
        },
        staleTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false
    })
}