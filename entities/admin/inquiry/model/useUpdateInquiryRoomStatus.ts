import { updateInquiryRoomStatus } from "@/entities/admin/inquiry/api/updateInquiryRoomStatus";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateInquiryRoomStatus() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateInquiryRoomStatus,
        onSuccess: (_, roomId) => {
            queryClient.invalidateQueries({queryKey:['inquiryRoom', roomId]})
        }
    })
    
}