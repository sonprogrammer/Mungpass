'use client'

import { EarlyCloseConfirmModalProps } from "@/features/owner/my-store/model/types"
import { useUpdateTempStatus } from "@/features/owner/my-store/model/useUpdataeTempStatus"
import { App, Input, Modal } from "antd"
import { useState } from "react"

export function EarlyCloseConfirmModal({tempType, open,onClose, shopId}: EarlyCloseConfirmModalProps) {
    const [reason, setReason] = useState('')
    // * 즉시 휴무 or  조기 마감 등록
    const {mutate: updateTodayStatus, isPending} = useUpdateTempStatus()

    const {message} = App.useApp()

    const handleConfirmUpdate = () => {
        if(!tempType) return
        updateTodayStatus({
            shopId,
            type: tempType,
            reason: reason
        },{
            onSuccess: () => {
                message.success('상태가 변경되었습니다.')
                setReason('')
                onClose()
            }
        })
        
        setReason('')
    }
    
    return(
        <Modal
            title={tempType === 'SHUTDOWN' ? '즉시 휴무 사유 입력' : '조기 마감 사유 입력'}
            open={open}
            onOk={handleConfirmUpdate}
            onCancel={onClose}
            okText='적용하기'
            cancelText='취소'
            confirmLoading={isPending}
            okButtonProps={{danger: tempType === 'SHUTDOWN'}}
            centered
            destroyOnHidden
        >
            <div className="py-4">
                <p className='text-xs text-gray-500 mb-2'>고객들에게 노출될 사유를 적어주세요</p>
                <Input.TextArea
                    rows={4}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder='사유를 입력해주세요.'
                    maxLength={100}
                    showCount
                    style={{resize: 'none'}}
                />
            </div>
        </Modal>
    )
}