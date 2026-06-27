import { UsageLogStatus } from "@/entities/check-in/model";
import { useUserStore } from "@/entities/user/model";
import { getMyPetUsage } from "@/features/qr/api";
import { useQuery } from "@tanstack/react-query";

export function useGetMyPetUsage({statuses=['staying']}: { statuses?: UsageLogStatus[]}) {
    const profile = useUserStore(state => state.profile)
    const userId = profile?.id
    return useQuery({
        queryKey: ['myPet-checkIn', userId, statuses],
        queryFn: async() => {
            const res = await getMyPetUsage({ statuses})
            if(!res.success) throw new Error(res.message)
            return res.data
        },
        enabled: !!userId,
        refetchOnWindowFocus: true
    })
}