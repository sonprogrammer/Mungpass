import { App } from 'antd';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDogStore } from '@/entities/dog/model';
import { deleteDog } from '@/entities/dog/api';
import { useUserStore } from '@/entities/user/model';

export const useDeleteDog = () => {
    const queryClient = useQueryClient()
    const setSelectedDog = useDogStore(state => state.setSelectedDog)
    const profile = useUserStore(state => state.profile)
    const userId = profile?.id

    const { message } = App.useApp()

    return useMutation({
        mutationFn: async ({ dogId }: { dogId: string }) => {
            const res = await deleteDog({ dogId })
            if (!res.success) throw new Error(res.message)
            return res.data //null return
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-dogs', userId] })
            setSelectedDog(null)
        },
        onError: (error) => {
            console.error('failed to delete', error)
            message.error('삭제중 에러가 발생했습니다. 다시시도해주세요')
        }
    })
}