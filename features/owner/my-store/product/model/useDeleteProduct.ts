import { deleteProduct } from "@/features/owner/my-store/product/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";

export function useDeleteProduct() {
    const queryClient = useQueryClient()

    const {message} = App.useApp()

    return useMutation({
        mutationFn: async({productId}: {productId: string, shopId: string}) => {
            const res = await deleteProduct({productId})
            if(!res.success) throw new Error(res.message)
            return res.data

        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['products']})
            message.success('상품이 삭제되었습니다.')
        },
        onError: (error) => {
            console.error('상품 삭제 실패', error)
            message.error('상품 삭제에 실패했습니다. 다시 시도해주세요')
        }

    })
}