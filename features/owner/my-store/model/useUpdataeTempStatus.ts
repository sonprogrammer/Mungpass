import { updateTempStatus } from "@/features/owner/my-store/api/updateTempStatus";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";

export function useUpdateTempStatus() {
    const queryClient = useQueryClient()

    const {message} = App.useApp()

    return useMutation({
        mutationFn: ({shopId, type, reason}:{shopId: string, type: 'SHUTDOWN'|'EARLY_CLOSE', reason: string}) =>  updateTempStatus({shopId, type, reason}),
        onSuccess: (_, {shopId}) => {
            queryClient.invalidateQueries({queryKey:['todayTemp', shopId]})
            queryClient.invalidateQueries({queryKey:['vacation', shopId]})
            queryClient.invalidateQueries({queryKey:['schedule', shopId]})
        },
        onError: (error) => {
            console.error('조기마감, 즉시휴무 취소시 에러 발생 ', error)
            message.error('저장 중 오류가 발생했습니다. 다시 시도해주세요')
        }
    })
}