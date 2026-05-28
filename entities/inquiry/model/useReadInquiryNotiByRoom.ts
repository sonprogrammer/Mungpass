import { readInquiryNotiByRoom } from "@/entities/admin/inquiry/api/readInquiryNotiByRoom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// ! 유저가 자신의 알림을 읽는것 채팅방 들어가면 자동읽음처리, 관리자는 답장을 할시 알림 읽은 처리
export function useReadInquiryNotiByRoom() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: readInquiryNotiByRoom,
        onSuccess: (_, variables) => {
            if(variables.type === 'inquiry_res'){
                queryClient.invalidateQueries({queryKey: ['inquiry-user-noti']})
            }else{
                queryClient.invalidateQueries({queryKey: ['inquiry-noti-admin']})
            }
        }
    })
}