import { registerPrimaryDog } from "@/entities/dog/api/registerPrimaryDog";
import { Dog, useDogStore } from "@/entities/dog/model/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRegisterPrimaryDog =(userId: string) => {
    const queryClient = useQueryClient()
    const setSelectedDog = useDogStore(state => state.setSelectedDog)

    
    return useMutation({
        mutationFn: registerPrimaryDog,
        onMutate: async({dogId, currentPrimary}) => {
            await queryClient.cancelQueries({queryKey: ['my-dogs', userId]})
            const previousDogs = queryClient.getQueryData<Dog[]>(['my-dogs', userId])

            queryClient.setQueryData<Dog[]>(['my-dogs', userId], (old: Dog[] | undefined) => {
                if(!old) return previousDogs
                return old?.map((dog: Dog) => ({
                    ...dog,
                    is_primary: currentPrimary ? false : dog.id === dogId
                }))
            })
            return { previousDogs }
        },
        onSuccess: (data, variables) => {
            const userDogs = queryClient.getQueryData<Dog[]>(['my-dogs', userId])
            const targetDog = userDogs?.find((dog) => dog.id === variables.dogId)
            const targetName = targetDog?.name || ''

            console.log('dogInfo', targetDog)
            const toggle = variables.currentPrimary ? '취소' : '등록'
            alert(`${targetName} 대표 강아지 ${toggle}`)
        },
        onError: (err, _, context) => {
            if(context?.previousDogs){
                queryClient.setQueryData(['my-dogs', userId], context.previousDogs)
            }
            alert('오류가 발생하였습니다')
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['my-dogs', userId]})
        }
    })
}