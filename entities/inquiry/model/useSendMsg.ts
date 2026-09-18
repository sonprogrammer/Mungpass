import { sendInquiryMsg } from "@/entities/inquiry/api";
import { SendInquiryMsgPayload } from "@/entities/inquiry/model/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";

export function useSendMsg() {
    const queryClient = useQueryClient()

    const { message } = App.useApp()

    return useMutation({
        mutationFn: async (payload: SendInquiryMsgPayload) => {
            const res = await sendInquiryMsg(payload)
            if(!res.success) throw new Error(res.message)
            return res.data
        }
        ,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inquiry-list'] })
        },
        onError: (error) => {
            console.error(error)
            message.error('메시지 전송에 실패했습니다. 다시 시도해주세요')
        }
    })
}