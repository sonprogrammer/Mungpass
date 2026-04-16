import { deleteVacation } from "@/features/owner/my-store/api/deleteVacation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";

export function useDeleteVacation() {
    const queryClient = useQueryClient()

    const {message} = App.useApp()

    return useMutation({
        mutationFn: (shopId: string) => deleteVacation(shopId),
        onSuccess: (_, shopId) => {
            queryClient.invalidateQueries({queryKey:['todayTemp', shopId]})
            queryClient.invalidateQueries({queryKey:['vacations', shopId]})
            queryClient.invalidateQueries({queryKey:['schedules', shopId]})
            message.success('휴가 일정이 취소되었습니다. 정상 영업 상태로 복구합니다')
        },
        onError: (error) => {
            console.log('휴가 취소 중 에러 발생',error)
            message.error('저장 중 오류가 발생했습니다. 다시 시도해주세요')
        }
    })
}