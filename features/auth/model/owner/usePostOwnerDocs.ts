
import { postOwnerDocs } from "@/features/auth/api/postOwnerDocs";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from 'next/navigation';

export const usePostOwnerDocs = () => {
    const router = useRouter()

    return useMutation({
        mutationFn: postOwnerDocs,
        onSuccess: () => {
            alert('심사 요청이 성공적으로 접수되었습니다')
            router.push('/signup/owner/complete')
        },
        onError: (error) => {
            console.error('request failed', error)
            alert(error.message || 'error occured')
        }
    })
}