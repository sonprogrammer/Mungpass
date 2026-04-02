import { updateVacation } from "@/features/owner/my-store/api/updateVacation";
import { UpdateVacationToServer } from "@/features/owner/my-store/model/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export function useUpdateVacation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (vacationData:UpdateVacationToServer ) => updateVacation(vacationData),
        onSuccess: (_, variables) => {
            const shopId = variables.shop_id
            queryClient.invalidateQueries({queryKey: ['schedules', shopId]})
            queryClient.invalidateQueries({queryKey: ['vacations', shopId]})

            message.success('장기 휴가 설정이 저장되었습니다')
        },
        onError: (error) => {
            message.error('저장 중 오류가 발생했습니다. 다시 시도해주세요')
        }
    })
}