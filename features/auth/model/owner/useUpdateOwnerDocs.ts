import { updateOwnerDocs } from "@/features/auth/api";
import { useStoreRegistrationStore } from "@/features/auth/model/owner";
import { UpdateDocsInfo } from "@/features/auth/model/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { useRouter } from "next/navigation";


export function useUpdateOwnerDocs() {
    const queryClient = useQueryClient()

    const reset = useStoreRegistrationStore(state => state.reset)

    const { message } = App.useApp()
    const router = useRouter()

    return useMutation({
        mutationFn: async (payload: UpdateDocsInfo) => {
            const res = await updateOwnerDocs(payload)
            if (!res.success) throw new Error(res.message)
            return res.data
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['regisData', variables.ownerId] })

            message.success({
                content: '재심사 요청이 완료되었습니다.',
                duration: 3
            })
            reset()
            router.replace('/owner')
        },
        onError: (error) => {
            message.error(`재제출중 오류가 발생했습니다. 다시시도해주세요.`)
            console.error(error)
        }

    })
}