'use client'

import { getKioskPin } from "@/entities/owner/my-shop/api/getKioskPin"
import { updateKioskPin } from "@/entities/owner/my-shop/api/updateKioskPin"
import { BottomSheet } from "@/shared/ui/place/BottomSheet"
import { Alert, App, Button, Input, Space, Typography } from "antd"
import { AlertCircle, Check, Edit2, Lock, Monitor, Play } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export function KioskSettingBottomSheet({ open, onClose, shopId }: { open: boolean, onClose: () => void, shopId: string }) {
    const [pin, setPin] = useState('0000')
    const [isLoading, setIsLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const router = useRouter()

    const { message } = App.useApp()

    useEffect(() => {
        if (open && shopId) {
            getKioskPin(shopId).then(setPin).catch(() => message.error('PIN 정보를 불러오지 못했습니다'))
        }
    }, [open, shopId, message])

    const handleSavePin = async () => {
        if (pin.length < 4) {
            return message.warning('PIN번호는 4자리로 설정해주세요')
        }
        setIsLoading(true)
        try {
            await updateKioskPin(shopId, pin)
            message.success('비밀번호가 변경되었습니다')
            setIsLoading(false)
            setIsEditing(false)
        } catch {
            message.error('저장에 실패했습니다')
        } finally {
            setIsLoading(false)
        }
    }

    const handleStartKiosk = () => {
        if (isEditing) return message.warning('비밀번호 수정을 완료해주세요')
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen()
        }
        router.replace(`/kiosk/${shopId}`)
        onClose()
    }

    return (
        <BottomSheet isOpen={open} onClose={onClose}>
            <div className="p-6 pb-10">
                <header>
                    <Monitor className="w-6 h-6 text-emerald-600" />
                    <Typography.Title level={4} style={{ margin: 0 }}>키오스크 모드 설정</Typography.Title>
                </header>

                <Space direction="vertical" size="large" className="w-full">

                    {/* //* 핀번호 설정 */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <div className="flex justify-between items-center mb-4">
                            <Space size={4}>
                                <Lock className="w-4 h-4 text-slate-400" />
                                <Typography.Text strong className="text-slate-600">종료 비밀번호 (PIN)</Typography.Text>
                            </Space>

                            <div className="flex gap-2">
                                {isEditing ? (
                                    <>
                                        <Button
                                            type="text"
                                            size="small"
                                            onClick={() => setIsEditing(false)}
                                            className="text-slate-400"
                                        >
                                            취소
                                        </Button>
                                        <Button
                                            type="text"
                                            size="small"
                                            icon={<Check size={16} />}
                                            onClick={handleSavePin}
                                            loading={isLoading}
                                            className="text-blue-600 font-bold"
                                        >
                                            저장
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        type="text"
                                        size="small"
                                        icon={<Edit2 size={16} />}
                                        onClick={() => setIsEditing(true)}
                                        className="text-slate-400"
                                    >
                                        수정
                                    </Button>
                                )}
                            </div>
                        </div>
                        <Input.Password
                            value={pin}
                            onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ''))}
                            maxLength={4}
                            disabled={!isEditing}
                            placeholder="0000"
                            size="large"
                            className={`text-center! font-bold! text-2xl! transition-all! ${isEditing ? "bg-white! ring-2! ring-emerald-100! rounded-lg!" : ""}`}
                        />

                    </div>

                    <Alert
                        message="이동 전 확인하세요"
                        description="키오스크 화면으로 이동하면 사장님 페이지로 돌아오기 위해 위 PIN 번호가 필요합니다."
                        type="warning"
                        showIcon
                        icon={<AlertCircle className="w-5 h-5 text-amber-500" />}
                        className="rounded-xl border-amber-100 bg-amber-50/50"
                    />

                    <div className="pt-2">
                        <Button
                            type="primary"
                            size="large"
                            block
                            icon={<Play className="w-4 h-4 fill-current" />}
                            onClick={handleStartKiosk}
                            disabled={isEditing}
                            className="h-14 rounded-2xl bg-emerald-600! hover:bg-emerald-700! border-none shadow-lg shadow-emerald-100 flex items-center justify-center gap-2"
                        >
                            <span className="font-bold text-lg">키오스크 모드 시작</span>
                        </Button>
                    </div>

                </Space>

            </div>
        </BottomSheet>
    )
}