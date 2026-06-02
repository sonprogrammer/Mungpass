import { StoreRegistration } from "@/entities/owner/my-shop/model"

export interface StoreDocPreviewModalProps {
    previewUrl: string | null
    onClose: () => void
}

export interface StoreApprovalTimelineProps {
    regisData: StoreRegistration
    currentStatus: 'APPROVED' | 'PENDING' | 'REJECTED'
}

export interface StoreDetailStatusModalProps{
     isOpen:boolean
     onClose: () => void
     storeName: string 
     currentStatus: "PENDING" | "APPROVED" | "REJECTED"
     regisData: StoreRegistration
     handleReSubmit: () => void
     handleOpenDocs: (path: string) => void
}