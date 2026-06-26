import { updateSchedule } from "@/features/owner/my-store/api";
import { ScheduleRow } from "@/features/owner/my-store/model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";

export function useUpdateSchedules() {
    const queryClient = useQueryClient()

    const { message } = App.useApp()
    return useMutation({
        mutationFn: async({ schedules }: { schedules:ScheduleRow[] }) => {
            const res = await updateSchedule({ schedules })
            if(!res.success) throw new Error(res.message)
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['schedules'] })
            message.success('영업 시간이 성공적으로 저장되었습니다')
        },
        onError: (error) => {
            console.error('영업시간 저장 중 에러 발생', error)
            message.error(`저장 실패 ${error.message}`)
        }
    })
}