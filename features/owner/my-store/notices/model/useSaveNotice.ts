import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveNotice } from "../api/saveNotice";
import { App } from "antd";


export function useSaveNotice(shopId: string) {
    const queryClient = useQueryClient()

    const { message} = App.useApp()
    
    return useMutation({
        mutationFn: saveNotice,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey: ['notices', variables.shopId]})
            message.success('공지사항이 성공적으로 저장되었습니다')
        },
        onError: (error) => {
            console.error('공지사항 저장 실패', error)
            message.error('공지사항 저장 실패했습니다. 다시 시도 해주세요')
        }
    })
}