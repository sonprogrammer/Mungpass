'use client'

import { StoreNoticeDeleteCheckModalProps } from "@/features/owner/my-store/notices/model/types"
import { useDeleteNotice } from "@/features/owner/my-store/notices/model/useDeleteNotice"
import { Button, Modal } from "antd"
import { AlertTriangle } from "lucide-react"

export function StoreNoticeDeleteCheckModal({ shopId, noticeId, isOpen, onClose }: StoreNoticeDeleteCheckModalProps) {
    const { mutate: deleteNotice, isPending: isDeleting } = useDeleteNotice(shopId)

    const handleDelete = () => {
        if (!noticeId) return
        deleteNotice(noticeId)
        onClose()
    }

    return (
        <Modal
            title={
                <div className="flex items-center gap-2 pb-1">
                    <AlertTriangle className="text-red-500 w-5 h-5" />
                    <span className="font-bold text-gray-900 text-lg">공지사항 삭제</span>
                </div>
            }
            open={isOpen}
            onCancel={onClose}
            footer={null}
            centered
            width={400}
            closable={!isDeleting} 
            maskClosable={!isDeleting}
        >
            <div className="text-sm text-gray-500 font-medium my-4 leading-relaxed">
                선택하신 공지사항을 삭제하시겠습니까?<br />
                <span className="text-red-400 text-xs font-bold">
                    *(삭제된 공지는 유저 앱에서도 즉시 사라지며 복구할 수 없습니다.)
                </span>
            </div>

            <div className="flex gap-3 mt-6">
                <Button
                    size="large"
                    disabled={isDeleting}
                    className="flex-1 rounded-xl font-medium h-11"
                    onClick={onClose}
                >
                    취소
                </Button>
                <Button
                    type="primary"
                    danger
                    size="large"
                    loading={isDeleting}
                    className="flex-1 bg-red-500! hover:bg-red-600! font-bold! rounded-xl! h-11!"
                    onClick={handleDelete}
                >
                    삭제하기
                </Button>
            </div>
        </Modal>
    )
}