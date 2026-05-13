
import { postOwnerDocs } from "@/features/auth/api/postOwnerDocs";
import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import { useRouter } from 'next/navigation';

export const usePostOwnerDocs = () => {
    const router = useRouter()

    const { message } = App.useApp()

    return useMutation({
        mutationFn: postOwnerDocs,
        onSuccess: (_, variables) => {
            console.log('variables', variables)
            message.success('심사 요청이 성공적으로 접수되었습니다')
            router.push(`/signup/owner/complete?ownerId=${variables.ownerId}`)
        },
        onError: (error) => {
            console.error('request failed', error)
            message.error(error.message || 'error occured')
        },

    })
}