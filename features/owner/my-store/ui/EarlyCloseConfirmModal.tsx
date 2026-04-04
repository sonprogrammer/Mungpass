'use client'

import { EarlyCloseConfirmModalProps } from "@/features/owner/my-store/model/types"
import { Input, Modal } from "antd"

export function EarlyCloseConfirmModal({tempType, open,onClose, onConfirm, reason, setReason}: EarlyCloseConfirmModalProps) {
    return(
        <Modal
            title={tempType === 'SHUTDOWN' ? '즉시 휴무 사유 입력' : '조기 마감 사유 입력'}
            open={open}
            onOk={onConfirm}
            onCancel={onClose}
            okText='적용하기'
            cancelText='취소'
            okButtonProps={{danger: tempType === 'SHUTDOWN'}}
            centered
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