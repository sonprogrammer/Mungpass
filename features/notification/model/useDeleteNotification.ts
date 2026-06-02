import { deleteNotification } from "@/features/notification/api";
import { useNotificationStore } from "@/features/notification/model";
import { useMutation } from "@tanstack/react-query";
import { App } from "antd";

export function useDeleteNotification() {
    const removeNotification = useNotificationStore(state => state.removeNotification)
    const { message} = App.useApp()

    
    return useMutation({
        mutationFn: deleteNotification,
        onSuccess: (_,notiId) => {
            removeNotification(notiId)
            message.success('삭제 성공')
        },
        onError: () => {
            message.error('삭제중 에러가 발생')
        }
    })
}