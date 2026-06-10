import { updateProduct } from "@/features/owner/my-store/product/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";

export function useUpdateProduct(shopId: string) {
    const queyrClient = useQueryClient()

    const {message} = App.useApp()

    return useMutation({
        mutationFn: updateProduct,
        onSuccess: () => {
            queyrClient.invalidateQueries({queryKey:['products', shopId]})
            message.success('상품이 업데이트되었습니다')
        },
        onError: (err) => {
            console.error('error occured', err)
            message.error('상품 업데이트 실패')
        }
    })
}