import { readInquiryNoti } from "@/features/notification/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useReadInquiryNoti(userId:string){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id:string) => readInquiryNoti(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['inquiry-user-noti', userId]
            })
        }
    })
}