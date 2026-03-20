'use client'

import { ConfirmModalProps } from "@/shared/model/types"
import { Button, Modal, Typography } from "antd"

export function ConfirmModal({open, title, description, confirmText ='확인', cancelText='취소', confirmDanger= false, isLoading=false, onConfirm, onCancel}: ConfirmModalProps) {
    return(
        <Modal
            open={open}
            onCancel={onCancel}
            footer={null}
            centered
            width={360}
            closable={!isLoading}
        >
            <div className="pt-2">
                <Typography.Title level={5} className="mb-5!">
                    {title}
                </Typography.Title>

                {description && (
                    <Typography.Text type="secondary" className="block whitespace-pre-line">
                        {description}
                    </Typography.Text>
                )}

                <div className="flex gap-3 mt-6">
                    <Button
                        className="flex-1"
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        type={confirmDanger ? 'primary' : 'default'}
                        danger={confirmDanger}
                        className="flex-1"
                        loading={isLoading}
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
            
        </Modal>
    )
}