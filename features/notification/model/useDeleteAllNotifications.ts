import { deleteAllNotifications } from "@/features/notification/api";
import { useNotificationStore } from "@/features/notification/model";
import { useMutation } from "@tanstack/react-query";
import { App } from "antd";

export function useDeleteAllNotifications() {
    const clearAllNotifications = useNotificationStore(state => state.clearAllNotifications)
    
    const {message} = App.useApp()
    
    return useMutation({
        mutationFn: deleteAllNotifications,
        onSuccess: () => {
            clearAllNotifications()
            message.success('모든 알림 삭제 성공')
        },
        onError: () => {
            message.error('알림 삭제 중 에러 발생')
        }
    })
}