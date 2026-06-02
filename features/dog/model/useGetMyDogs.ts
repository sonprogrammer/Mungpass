import { fetchDogs } from "@/entities/dog/api";
import { useUserStore } from "@/entities/user/model";
import { useQuery } from "@tanstack/react-query";


export const useGetMyDogs = () => {
    const profile = useUserStore(state => state.profile)
    const userId = profile?.id
    return useQuery({
        queryKey: ['my-dogs', userId],
        queryFn: () => fetchDogs(userId!),
        enabled: !!userId,
        staleTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false
    })
}