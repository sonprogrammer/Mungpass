import { deleteTodayStatus } from "@/features/owner/my-store/api/deleteTodayStatus";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export function useDeleteTodayStatus(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (shopId: string) => deleteTodayStatus(shopId),
        onSuccess: (_, shopId) => {
            queryClient.invalidateQueries({queryKey:['todayTemp', shopId]})
            queryClient.invalidateQueries({queryKey:['vacation', shopId]})
            queryClient.invalidateQueries({queryKey:['schedule', shopId]})
            message.success('당일 휴무가 취소 되었습니다')
        },
        onError: (error) => {
            console.log('상태 해제 중오류 발생 ', error)
            message.error('저장 중 오류가 발생했습니다. 다시 시도해주세요')
        }
    })
}