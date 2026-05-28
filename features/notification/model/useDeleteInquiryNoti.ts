import { deleteIquiryNoti } from "@/features/notification/api/deleteInquiryNoti";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";

export function useDeleteInquiryNoti(userId: string) {
    const queuryClient = useQueryClient()

    const { message} = App.useApp()

    
    return useMutation({
        mutationFn: deleteIquiryNoti,
        onSuccess: () => {
            queuryClient.invalidateQueries({queryKey: ['inquiry-user-noti', userId]})
            message.success('삭제 성공')
        },onError: (error) => {
            console.error(error)
            message.error('삭제 실패. 다시 시도해주세요')
        }
    })
}