import { App } from 'antd';
import { useDogStore } from "@/entities/dog/model/types";
import { deleteDog } from "@/entities/dog/api/deleteDog";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteDog = () => {
    const queryClient = useQueryClient()
    const setSelectedDog = useDogStore(state => state.setSelectedDog)

    const { message} =App.useApp()

    return useMutation({
        mutationFn: ({userId, dogId}: {userId: string, dogId: string}) => deleteDog({userId, dogId}),    
        onSuccess: (deletedId, variables) => {
            queryClient.invalidateQueries({queryKey: ['my-dogs', variables.userId]})
            setSelectedDog(null)
        },
        onError: (error) => {
            console.error('failed to delete', error)
            message.error('삭제중 에러가 발생했습니다. 다시시도해주세요')
        }
    })
}