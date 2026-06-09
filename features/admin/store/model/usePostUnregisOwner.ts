import { postUnreigisOwner } from "@/features/admin/store/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePostUnregisOwner() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: postUnreigisOwner,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['shops']})
            queryClient.invalidateQueries({queryKey: ['get-unregist-owner']})
        },
        onError: (error)=> {
            console.error('등록 실패',error)
        }
    })
}