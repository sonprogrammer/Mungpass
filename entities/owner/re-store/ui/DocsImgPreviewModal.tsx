'use client'

import { DocsImgPreiewModalProps } from "@/entities/owner/re-store/model"
import { Modal } from "antd"
import Image from "next/image"


export function DocsImgPreviewModal({isOpen, onClose,imgUrl} :DocsImgPreiewModalProps) {
    if(!imgUrl) return null

    return(
        <Modal
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width={450}
            styles={{ body: {padding: 0, overflow: "hidden", borderRadius: '16px'}}}
            centered
        >
            <div className="relative w-full min-h-125 max-h-[80vh] flex items-center justify-center bg-slate-50">
                    <Image 
                    src={imgUrl}
                    alt="서류 원본 미리보기"
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 500px) 100vw, 600px"
                />
            </div>

        </Modal>
    )
    
}