import { useDogStore } from "@/entities/dog/model/types";
import { deleteDog } from "@/entities/dog/api/deleteDog";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteDog = () => {
    const queryClient = useQueryClient()
    const setSelectedDog = useDogStore(state => state.setSelectedDog)

    return useMutation({
        mutationFn: ({userId, dogId}: {userId: string, dogId: string}) => deleteDog({userId, dogId}),    
        onSuccess: (deletedId, variables) => {
            queryClient.invalidateQueries({queryKey: ['my-dogs', variables.userId]})
            setSelectedDog(null)
            console.log('data from delete hook', deletedId)
            alert('삭제되었습니다')
        },
        onError: (error) => {
            console.error('failed to delete', error)
            alert('error occured during deleting dog')
        }
    })
}