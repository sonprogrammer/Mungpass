import { useUserStore } from "@/entities/user/model";
import { userCheckIn } from "@/features/qr/api";
import { CheckinParams } from "@/features/qr/model/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePostCheckIn() {
    const queryClient = useQueryClient()
    const profile = useUserStore(state => state.profile)
    const userId = profile?.id

    return useMutation({
        mutationFn: async(params: CheckinParams) => {
            const res = await userCheckIn(params)
            if(!res.success)throw new Error(res.message)
            return res.data

        },
        onSuccess: (_,variables) => {

            queryClient.invalidateQueries({queryKey:['checkIn_logs', userId]})
            queryClient.invalidateQueries({queryKey:['checkIn_logs', userId, variables.dogId]})
            queryClient.invalidateQueries({queryKey:['myPet-checkIn', userId]})
        },
        onError: (error)=> {
            console.error('checkin hooks error',error)
        }
    })
}