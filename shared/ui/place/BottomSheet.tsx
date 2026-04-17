'use client'

import { BottomSheetProps } from "@/shared/model/place"
import { useEffect, useState} from "react"
import { createPortal } from "react-dom";


export function BottomSheet({ isOpen, onClose, children }: BottomSheetProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setMounted(true)
        }, 0)
        if(isOpen) {
            document.body.style.overflow = 'hidden';
        }else{
            document.body.style.overflow = 'unset';
        }
        return () => {
            clearTimeout(timeout)
            document.body.style.overflow = 'unset';
        }
    },[isOpen])
    
    if (!mounted) return null
    
    return createPortal(
        <>
            <div
                onClick={onClose}
                className={`fixed inset-0 bg-black/40 transition-opacity z-100 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            />

            <div
                className={`fixed w-full left-1/2 -translate-x-1/2 h-full max-w-120 bottom-0 max-h-[80%] z-200 bg-white rounded-t-4xl p-6 transition-transform duration-300 ease-out transform
                            ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
            >

                <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6" />
                {children}
            </div>
        </>, document.body
    )
}