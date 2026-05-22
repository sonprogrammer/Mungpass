'use client'

import { StoreDocPreviewModalProps } from "@/widgets/owner/my-store/model/types"
import { Modal } from "antd"
import Image from "next/image"


export function StoreDocPreviewModal({ previewUrl, onClose }: StoreDocPreviewModalProps) {
    return (
        <Modal
            open={!!previewUrl}
            footer={null}
            width={800}
            onCancel={onClose}
            centered={true}
        >

            {previewUrl && (
                previewUrl.toLowerCase().includes(".pdf") ? (
                    <iframe
                        src={previewUrl}
                        width="100%"
                        height="600px"
                        style={{ border: "none" }}
                    />
                ) : (
                    <div className="relative w-full aspect-3/4 min-h-75">
                        <Image
                            src={previewUrl}
                            alt='사업자 등록증 미리보기'
                            fill
                            className="object-contain"
                            sizes="(max-width: 480px) 100vw, 700px"
                            onContextMenu={(e) => e.preventDefault()}
                            draggable={false}
                            priority
                        />
                    </div>
                )
            )}

        </Modal>
    )
}