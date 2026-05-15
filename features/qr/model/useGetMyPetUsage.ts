import { UsageLogStatus } from "@/entities/check-in/model/types";
import { useUserStore } from "@/entities/user/model/useUserStore";
import { getMyPetUsage } from "@/features/qr/api/getMyPetUsage";
import { useQuery } from "@tanstack/react-query";

export function useGetMyPetUsage({statuses=['staying']}: { statuses: UsageLogStatus[]}) {
    const profile = useUserStore(state => state.profile)
    const userId = profile?.id
    return useQuery({
        queryKey: ['myPet-checkIn', userId, statuses],
        queryFn: () => getMyPetUsage({userId:userId!, statuses}),
        enabled: !!userId,
        refetchOnWindowFocus: true
    })
}