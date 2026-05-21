import { deleteNotice } from "@/features/owner/my-store/notices/api/deleteNotice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";

export function useDeleteNotice(shopId: string) {
    const queryClient = useQueryClient()
    const { message } = App.useApp()

    return useMutation({
        mutationFn: deleteNotice,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['notices', shopId]})
            message.success('공지사항이 삭제되었습니다.')
        },
        onError: (error) => {
            console.error('공지사항 살제 실패', error)
            message.error('공지사항 삭제중 오류 발생')
        }
    })
    
}