

import { registerDog } from "@/entities/dog/api";
import { DogRegisterToSever } from "@/features/dog/model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from 'antd';

export const useRegisterDog = () => {
    const queryClient = useQueryClient()
    const { message } = App.useApp()

    return useMutation({
        mutationFn: async ({ formData, image }: { formData: DogRegisterToSever, image: File | null, userId: string }) => {
            const res = await registerDog(formData, image)
            if (!res.success) throw new Error(res.message)
            return res.data
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['my-dogs', variables.userId] })

        },
        onError: (error) => {
            message.error(error.message || 'error occureed form useregister hooks')
        }
    })
}