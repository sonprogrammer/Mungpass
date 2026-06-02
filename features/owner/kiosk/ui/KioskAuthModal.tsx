'use client'

import { verifyKioskPin } from "@/entities/owner/kiosk/api";
import { App, Input, Modal } from "antd"
import { useState } from "react"

interface KioskAuthModalProps {
    shopId: string;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void
}


export function KioskAuthModal({ shopId, isOpen, onClose, onSuccess }: KioskAuthModalProps) {
    const [kioskPin, setKioskPin] = useState('')
    const [loading, setLoading] = useState(false)

    const { message } = App.useApp()

    const handleConfirm = async (pin: string = kioskPin) => {
        if (!pin) return
        setLoading(true)
        try {
            const isValid = await verifyKioskPin(shopId, pin)

            if (isValid) {
                onSuccess()
                setKioskPin('')
            } else {
                message.error('비밀번호가 올바르지 않습니다')
                setKioskPin('')
            }
        } catch (error) {
            message.error('인증 중 오류가 발생했습니다')
            console.error('error', error)
        } finally {
            setLoading(false)
        }
    }

    const handleKeyClick = (key: string | number) => {
        if (key === 'C') {
            setKioskPin('')
        } else if (key === 'OK') {
            handleConfirm()
        } else {
            if (kioskPin.length < 4) {
                setKioskPin(prev => prev + key.toString())
            }
        }
    }


    return (
        <Modal
            title="관리자 인증"
            open={isOpen}
            onOk={() => handleConfirm()}
            confirmLoading={loading}
            onCancel={() => {
                setKioskPin('')
                onClose()
            }}
            okText="확인"
            cancelText="취소"
            centered
        >
            <div className="py-4">
                <Input.Password
                    value={kioskPin}
                    readOnly
                    placeholder="PIN번호를 입력해주세요"
                    className="text-center! text-2xl!"
                />
                <div className="grid grid-cols-3 gap-4 mt-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, 'OK'].map((num) => (
                        <button
                            key={num}
                            onClick={() => handleKeyClick(num)}
                            className={`
                                h-16 text-xl font-bold rounded-2xl transition-all active:scale-95
                                ${num === 'C' ? 'bg-red-50 text-red-500' :
                                    num === 'OK' ? 'bg-emerald-50 text-emerald-600' :
                                        'bg-slate-100 text-slate-700 active:bg-slate-200'}
                            `}
                        >
                            {num}
                        </button>
                    ))}
                </div>
            </div>
        </Modal>
    )
}