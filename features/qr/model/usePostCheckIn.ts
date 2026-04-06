import { useUserStore } from "@/entities/user/model/useUserStore";
import { userCheckIn } from "@/features/qr/api/userCheckIn";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePostCheckIn() {
    const queryClient = useQueryClient()
    const profile = useUserStore(state => state.profile)
    const userId = profile?.id

    return useMutation({
        mutationFn: userCheckIn,
        onSuccess: (data) => {
            console.log('usePostCheckIn hooks data', data)

            queryClient.invalidateQueries({queryKey:['checkIn_logs', userId]})
            queryClient.invalidateQueries({queryKey:['checkIn_logs', userId, data.dog_id]})
        },
        onError: (error)=> {
            console.error('checkin hooks error',error)
        }
    })
}