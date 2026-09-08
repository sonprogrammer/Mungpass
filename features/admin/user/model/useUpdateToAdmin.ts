import { appointAdmin } from "@/features/admin/user/api";
import { useMutation} from "@tanstack/react-query";
import { App } from "antd";

export const useUpdateToAdmin = () => {
    const {message} = App.useApp()

    return useMutation({
        mutationFn: appointAdmin,
        onSuccess: (data) => {
            message.success('임명 완료')
            if(!data.success){
                message.error(data.message ?? '관리자 임명 실패')
                return
            }
        },
        onError: () => {
            message.error('관리자 임명중 에러 발생')
        }
    })
}
