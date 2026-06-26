import { App } from 'antd';
import { postProduct } from "@/features/owner/my-store/product/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductSubmitData } from '@/features/owner/my-store/product/model';

export function usePostProduct() {
    const queryClient = useQueryClient()

    const { message} = App.useApp()
    
    return useMutation({
        mutationFn: async({ productData}:{productData: ProductSubmitData}) => {
            const res = await postProduct({ productData})
            if(!res.success) throw new Error(res.message)
            return res.data
        },
        onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['products']})
                message.success('새로운 상품이 등록되었습니다')
        },
        onError: (error) => {
            console.error('상품등록 실패 hook', error)
            message.error(error.message || '상품 등록에 실패하였습니다. 다시 시도 해주세요.')
        } 
    })
}