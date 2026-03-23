'use client'

import { DogSelectStep } from "@/features/user-checkin/ui/DogSelectStep";
import { Modal } from "antd"
import { useState } from "react"

interface CheckInModalProps{
    open: boolean;
    shopId: string | null;
    productId: string | null;
    onClose: () => void;
}

export function CheckInModal({open, shopId, productId, onClose}: CheckInModalProps) {
    const [selectedDogId, setSelectedDogId] = useState(null)
    return(
        <Modal open={open} onCancel={onClose} footer={null} centered>
            <DogSelectStep />
        </Modal>
    )
}