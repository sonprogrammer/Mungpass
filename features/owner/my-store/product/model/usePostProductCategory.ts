import { postProductCategory } from "@/features/owner/my-store/product/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";

export function usePostProductCategory() {
    const queryClient = useQueryClient()

    const { message} = App.useApp()

    return useMutation({
        mutationFn: ({categoryName, shopId} : {categoryName: string, shopId: string}) =>postProductCategory({categoryName, shopId}),
        onSuccess: (_, {shopId}) => {
            queryClient.invalidateQueries({queryKey: ['categories', shopId]})
            message.success('새로운 카테고리가 등록되었습니다')
        },
        onError: (error) => {
            console.error('카테고리등록 실패 hook', error)
            message.error(error.message || '카테고리 등록에 실패하였습니다. 다시 시도 해주세요.')
        }
    })
}