import { useUserStore } from "@/entities/user/model";
import { userCheckIn } from "@/features/qr/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePostCheckIn() {
    const queryClient = useQueryClient()
    const profile = useUserStore(state => state.profile)
    const userId = profile?.id

    return useMutation({
        mutationFn: userCheckIn,
        onSuccess: (data) => {

            queryClient.invalidateQueries({queryKey:['checkIn_logs', userId]})
            queryClient.invalidateQueries({queryKey:['checkIn_logs', userId, data.dog_id]})
            queryClient.invalidateQueries({queryKey:['myPet-checkIn', userId]})
        },
        onError: (error)=> {
            console.error('checkin hooks error',error)
        }
    })
}