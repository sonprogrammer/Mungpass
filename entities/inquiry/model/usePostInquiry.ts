import { createInquiryRoom } from "@/entities/inquiry/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";

export function usePostInquiry() {
    const queryClient = useQueryClient()

    const {message} = App.useApp()
    
    return useMutation({
        mutationFn: createInquiryRoom,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inquiry-list'] })
            message.success('문의가 등록되었습니다.')
        },
        onError: (error) => {
            message.error('문의 등록 실패, 다시 시도해주세요')
            console.error(error)
        }
    })
}