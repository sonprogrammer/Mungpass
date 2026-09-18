import { readAllInquiryNoti } from "@/features/notification/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useReadAllInquiryNoti(userId: string){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ()=> readAllInquiryNoti(userId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['inquiry-user-noti', userId]
            })
        }
    })
}