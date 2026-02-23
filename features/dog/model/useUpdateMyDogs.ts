import { DogRegisterToSever } from './types';
import { updateDogs } from "../../../entities/dog/api/updateDogs";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateMyDogs = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateDogs,
        onSuccess: (data,variables) => {
            queryClient.invalidateQueries({queryKey: ['my-dogs', variables.userId]})
            console.log('data form update hooks', data)
            console.log('data form update hooks variabale', variables)
            alert('수정 성공')
        },
        onError: (err) => {
            console.error(err)
            alert('수정 실패')
        }
    })
}