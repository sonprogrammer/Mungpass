'use client'

import { QrUnverifiedViewProps } from "@/features/qr/model/types"
import { Button, Empty, Typography } from "antd"

export function QrUnverifiedView({ onClose }: QrUnverifiedViewProps) {
    return (
        <div className="py-8 text-center">
            <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                    <div className="flex flex-col gap-2">
                        <Typography.Text className="text-slate-600 font-medium">
                            서비스 심사 승인 대기 중
                        </Typography.Text>
                        <Typography.Text type="secondary" className="text-xs">
                            매장 심사가 완료된 후에<br />
                            QR 코드를 생성하여 이용하실 수 있습니다.
                        </Typography.Text>
                    </div>
                }
            />
            <Button
                block
                type="primary"
                onClick={onClose}
                className="mt-6 bg-orange-500! border-none!"
            >
                확인
            </Button>
        </div>
    )
}