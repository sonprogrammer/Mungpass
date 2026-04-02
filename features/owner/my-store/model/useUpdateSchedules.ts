import { updateSchedule } from "@/features/owner/my-store/api/updateSchedule";
import { ScheduleRow } from "@/features/owner/my-store/model/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export function useUpdateSchedules() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ( {shopId,schedules} :{schedules:ScheduleRow | ScheduleRow [], shopId: string}) => updateSchedule({shopId, schedules}),
        onSuccess: (_, {shopId}) => {
            queryClient.invalidateQueries({queryKey: ['schedules', shopId]})
            message.success('영업 시간이 성공적으로 저장되었습니다')
        },
        onError: (error) => {
            message.error(`저장 실패 ${error.message}`)
        }
    })
}