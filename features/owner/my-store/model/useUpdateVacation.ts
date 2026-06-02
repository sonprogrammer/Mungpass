import { updateVacation } from "@/features/owner/my-store/api";
import { UpdateVacationToServer } from "@/features/owner/my-store/model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";

export function useUpdateVacation() {
    const queryClient = useQueryClient()

    const {message} = App.useApp()

    return useMutation({
        mutationFn: (vacationData:UpdateVacationToServer ) => updateVacation(vacationData),
        onSuccess: (_, variables) => {
            const shopId = variables.shop_id
            queryClient.invalidateQueries({queryKey: ['schedules', shopId]})
            queryClient.invalidateQueries({queryKey: ['vacations', shopId]})
        },
        onError: (error) => {
            console.error('저장 중 오류 발생', error)
            message.error('저장 중 오류가 발생했습니다. 다시 시도해주세요')
        }
    })
}