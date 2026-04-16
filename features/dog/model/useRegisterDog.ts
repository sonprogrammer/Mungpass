import { DogRegisterToSever } from './types';
import { registerDog } from "@/entities/dog/api/registerDog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from 'antd';

export const useRegisterDog = () => {
    const queryClient = useQueryClient()
    const {message} = App.useApp()

    return useMutation({
        mutationFn: ({formData, image, userId} : {formData: DogRegisterToSever, image: File | null, userId: string}) => registerDog(formData, image, userId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey: ['my-dogs', variables.userId]})

        },
        onError: (error) => {
            message.error(error.message || 'error occureed form useregister hooks')
        }
    })
}