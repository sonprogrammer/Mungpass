import { StoreRegistration } from "@/entities/owner/my-shop/model/types"

export interface StoreDocPreviewModalProps {
    previewUrl: string | null
    onClose: () => void
}

export interface StoreApprovalTimelineProps {
    regisData: StoreRegistration
    currentStatus: 'APPROVED' | 'PENDING' | 'REJECTED'
}