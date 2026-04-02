import { deleteVacation } from "@/features/owner/my-store/api/deleteVacation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export function useDeleteVacation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (shopId: string) => deleteVacation(shopId),
        onSuccess: (_, shopId) => {
            queryClient.invalidateQueries({queryKey: ['schedules', shopId]})
            queryClient.invalidateQueries({queryKey: ['vacations', shopId]})
            message.success('휴가 일정이 취소되었습니다. 정상 영업 상태로 복구합니다')
        }
    })
}