
import { App } from "antd";
import { updateDogs } from "../../../entities/dog/api/updateDogs";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateMyDogs = () => {
    const queryClient = useQueryClient()

    const { message} = App.useApp()

    return useMutation({
        mutationFn: updateDogs,
        onSuccess: (data,variables) => {
            queryClient.invalidateQueries({queryKey: ['my-dogs', variables.userId]})
            message.success('수정 성공')
        },
        onError: (err) => {
            console.error(err)
            message.error('수정 실패')
        }
    })
}