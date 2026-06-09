'use client'

import { Modal, Input, Button, Space, App } from "antd";
import { useState } from "react";
import { useUpdate } from "@refinedev/core";
import { ApproveStoreBtnProps } from "@/features/admin/store/model";

export function ApproveStoreBtn({ registrationID, registrationStoreName, onSuccess }: ApproveStoreBtnProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [status, setStatus] = useState<'APPROVED' | 'REJECTED'>('APPROVED')
    const [reason, setReason] = useState('')
    const { mutate, mutation: { isPending } } = useUpdate()

    const openModal = (s: 'APPROVED' | 'REJECTED') => {
        setStatus(s)
        setReason('')
        setIsModalOpen(true)
    }

    const { message} = App.useApp()
    const now = new Date().toISOString()
    
    const handleOk = () => {
        mutate({
            resource: 'store_registrations',
            id: registrationID,
            values: { 
                status, 
                rejection_reason: status === 'REJECTED' ? reason : undefined,
                approved_at: status === 'APPROVED' ? now : undefined,
                rejected_at: status === 'REJECTED' ? now : undefined
             }
        }, {
            onSuccess: () => {
                setIsModalOpen(false)
                onSuccess?.()
                message.success(`${registrationStoreName} 지점이 ${status === 'APPROVED' ? '승인' : '거절'}되었습니다.`)
            }
        })
    }


    return (
        <Space>
            <Button type="primary" loading={isPending} onClick={() => openModal('APPROVED')}>승인</Button>
            <Button danger loading={isPending} onClick={() => openModal('REJECTED')}>반려</Button>

            <Modal
                centered
                open={isModalOpen}
                onOk={handleOk}
                onCancel={() => setIsModalOpen(false)}
                okText={status === 'APPROVED' ? '승인' : '반려'}
                cancelText="취소"
                confirmLoading={isPending}
                // * 무조건 사유 입력하게 
                okButtonProps={{ disabled: status === 'REJECTED' && !reason.trim()}}
                title={(
                    <span
                        className={`font-bold text-lg`}
                    >
                        {registrationStoreName} 지점 검사
                    </span>
                    )}
            >
                <p>
                    <span className={`${status === 'APPROVED' ? 'text-green-500' : 'text-red-500'} font-bold underline underline-offset-2 text-lg`}>{status === 'APPROVED' ? '승인 ' : '반려 '}</span>
                     처리하시겠습니까?
                </p>
                {status === 'REJECTED' && (
                    <Input.TextArea
                        rows={3}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="반려 사유를 입력해주세요"
                        style={{ resize: 'none', marginTop: 8 }}
                        autoFocus
                    />
                )}
            </Modal>
        </Space>
    );
}