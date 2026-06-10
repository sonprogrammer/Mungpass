import { deleteProductCategory } from "@/features/owner/my-store/product/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";

export function useDeleteProductCategory() {
    const queryClient = useQueryClient()

    const { message} = App.useApp()

    return useMutation({
        mutationFn: ({shopId, categoryId}: {shopId: string, categoryId: string}) => deleteProductCategory({shopId, categoryId}),
        onSuccess: (_, {shopId}) => {
            queryClient.invalidateQueries({queryKey: ['categories', shopId]})
        },
        onError: (error) => {
            console.error('카테고리 삭제 실패', error)
            message.error('카테고리 삭제에 실패했습니다. 다시 시도해주세요')
        } 
    })
}