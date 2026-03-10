'use client'

import { ApproveStoreBtnProps } from "@/features/admin/store/model/type"
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons"
import { useUpdate } from "@refinedev/core"
import { Button, message, Modal, Space } from "antd"


export function ApproveStoreBtn({storeId, storeName, onSuccess}: ApproveStoreBtnProps) {
    const { mutate, mutation:{isPending}} = useUpdate()
    
    const handleUpdate = (status: 'APPROVED' | 'REJECTED') => {
        Modal.confirm({
            title: `'${storeName} 지점 심사`,
            content: `${status === 'APPROVED' ? '승인' : '반려'} 처리하시겠습니까?`,
            onOk: () => {
                mutate({
                    resource: 'store_registrations',
                    id: storeId,
                    values: {status}
                },{
                    onSuccess: () => {
                        message.success('처리가 완료되었습니다.')
                        onSuccess?.()
                    }
                }
            )
            }
        })
    }
    
    return(
        <Space>
            <Button
                type="primary"
                icon={<CheckCircleOutlined />}
                loading={isPending}
                onClick={() => handleUpdate('APPROVED')}
            >
                승인
            </Button>
            <Button
                danger
                icon={<CloseCircleOutlined />}
                loading={isPending}
                onClick={() => handleUpdate('REJECTED')}
            >
                반려
            </Button>

        </Space>
    )
}