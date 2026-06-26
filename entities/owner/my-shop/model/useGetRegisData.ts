import { getRegisData } from "@/entities/owner/my-shop/api";
import { useUserStore } from "@/entities/user/model";
import { useQuery } from "@tanstack/react-query";

export function useGetRegisData () {
    const profile = useUserStore(state => state.profile)
    const userId = profile?.id

    return useQuery({
        queryKey: ['regisData', userId],
        queryFn: async() => {
            const res = await getRegisData(userId!)
            if(!res.success) throw new Error(res.message)
            return res.data
        },
        enabled: !!userId,
        staleTime: 1000 * 60 * 5
    })
}