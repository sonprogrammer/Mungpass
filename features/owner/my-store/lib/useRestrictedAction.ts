import { RegistrationStatus } from "@/entities/owner/my-shop/model";
import { message } from "antd";
import { useState } from 'react';

export const useRestrictedAction = (status: RegistrationStatus | undefined) => {
    const [messageApi, contextHolder] = message.useMessage()
    const [isMessageShowing, setIsMessageShowing] = useState(false)

    const handleAction = (onClick: () => void) => {
        if(isMessageShowing) return
        
        if(status !== 'APPROVED'){
            setIsMessageShowing(true)
            messageApi.open({
                type: 'warning',
                content: status === 'REJECTED'
                    ? '서류가 반려되었습니다. 확인 후 다시 제출해주세요'
                    : '매장 승인 완료 후 이용이 가능한 서비스 입니다',
                duration: 3,
                style: {marginTop: '5vh'},
                onClose: () => setIsMessageShowing(false)
            })
            return
        }
        onClick()
    }
    return { handleAction, contextHolder}
}

