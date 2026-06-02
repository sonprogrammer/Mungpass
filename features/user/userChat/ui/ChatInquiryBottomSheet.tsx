'use client'

import { ChatInquiryContent } from "@/features/user/userChat/ui"
import { BottomSheet } from "@/shared/ui/place"
import { X } from "lucide-react"

interface ChatInquiryBottomSheetProps{
    isOpen: boolean
    onClose: () => void
}

export function ChatInquiryBottomSheet({isOpen, onClose}: ChatInquiryBottomSheetProps) {
    return(
        <BottomSheet isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col h-full pb-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900">1:1 채팅 문의</h2>
                    <button 
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <ChatInquiryContent />
            </div>
        </BottomSheet>
    )
}