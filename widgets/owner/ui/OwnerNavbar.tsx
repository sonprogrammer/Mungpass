'use client'

import { usePathname } from "next/navigation"
import {
    LayoutGrid,
    Store,
    ClipboardCheck,
    BarChart3,
    QrCode,
    Hotel,
    Gamepad2,
    Dog
} from "lucide-react"
import { NavItem } from "@/widgets/owner/ui/NavItem"
import { Modal, Button, Typography } from 'antd'
import { useState } from "react"

export function OwnerNavbar() {
    const [isQrModalOpen, setIsQrModalOpen] = useState<boolean>(false)
    const pathname = usePathname()
    const isQrActive = pathname === '/owner/qr'


    return (
        <>
            <nav className=" w-full max-w-120 bg-slate-50/90 backdrop-blur-2xl border-t border-slate-200 px-6 py-3 flex items-center z-50 rounded-t-[2.5rem] shadow-[0_-10px_30px_-5px_rgba(0,0,0,0.05)]">
                <div className="grid grid-cols-5 items-end w-full">

                    <NavItem
                        href="/owner"
                        label="대시보드"
                        icon={LayoutGrid}
                        active={pathname === '/owner'}
                    />
                    <NavItem
                        href="/owner/usage"
                        label="이용현황"
                        icon={ClipboardCheck}
                        active={pathname === '/owner/usage'}
                    />

                    <div className="flex flex-col items-center -mt-11">
                        <button
                            type="button"
                            onClick={() => setIsQrModalOpen(true)}
                            className="group flex flex-col items-center cursor-pointer">
                            <div className={`relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-white transition-all duration-300
                                    ${isQrActive
                                    ? 'bg-emerald-600 scale-[1.03] shadow-[0_14px_30px_rgba(16,185,129,0.32)]'
                                    : 'bg-emerald-500 shadow-[0_12px_26px_rgba(16,185,129,0.24)] hover:scale-[1.03] hover:bg-emerald-600'}
                                        `}>
                                <div className="absolute inset-0 rounded-full bg-white/10" />
                                <QrCode className="relative h-10 w-10 text-white" />
                            </div>
                            <span className={`mt-1.5 text-[11px] font-semibold tracking-tight ${isQrActive ? 'text-emerald-700' : 'text-slate-500'
                                }`}>QR체크인</span>
                        </button>
                    </div>

                    <NavItem
                        href="/owner/stats"
                        label="실적통계"
                        icon={BarChart3}
                        active={pathname === '/owner/stats'}
                    />

                    <NavItem
                        href="/owner/my-store"
                        label="매장관리"
                        icon={Store}
                        active={pathname === '/owner/my-store'}
                    />
                </div>

            </nav>

            <Modal
                open={isQrModalOpen}
                onCancel={() => setIsQrModalOpen(false)}
                footer={null}
                centered
                width={360}
                title={<span className="font-semibold">QR 체크인</span>}
            >

                {/* //TODO 여기는 사장이 적어논 상품들이 있어야함-store_products테이블 */}
                <div className="flex flex-col gap-3 pt-2">
                    <Typography.Text className="text-sm text-slate-500">
                        이용 유형을 선택해주세요.
                    </Typography.Text>

                    <Button
                        size="large"
                        className="h-14 justify-start border-emerald-100! hover:border-emerald-300!"
                        icon={<Dog size={18} />}
                    >
                        유치원
                    </Button>

                    <Button
                        size="large"
                        className="h-14 justify-start border-emerald-100! hover:border-emerald-300!"
                        icon={<Hotel size={18} />}
                    >
                        호텔
                    </Button>

                    <Button
                        size="large"
                        className="h-14 justify-start border-emerald-100! hover:border-emerald-300!"
                        icon={<Gamepad2 size={18} />}
                    >
                        놀이방
                    </Button>
                </div>
            </Modal>

        </>

    )
}