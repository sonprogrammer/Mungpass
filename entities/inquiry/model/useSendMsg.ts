import { sendInquiryMsg } from "@/entities/inquiry/api/sendInquiryMsg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";

export function useSendMsg(){
    const queryClient = useQueryClient()

    const {message} = App.useApp()

    return useMutation({
        mutationFn: sendInquiryMsg,
        onSuccess: (_, variables) => {

            queryClient.invalidateQueries({ queryKey: ['inquiry-list'] })
            if(variables.senderType === 'owner' || variables.senderType === 'user'){
                queryClient.invalidateQueries({queryKey: ['inquriy-admin-noti']})
            }else if(variables.senderType === 'admin'){
                queryClient.invalidateQueries({queryKey: ['inquiry-admin-noti']})
            }
        },
        onError: (error) => {
            console.error(error)
            message.error('메시지 전송에 실패했습니다. 다시 시도해주세요')
        }
    })
}