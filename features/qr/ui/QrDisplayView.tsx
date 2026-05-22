'use client'

import { Typography } from "antd"
import { QRCodeSVG } from "qrcode.react"

interface QrCodeDisplayViewProps {
    qrValue: string
}

export function QrCodeDisplayView({ qrValue }: QrCodeDisplayViewProps) {
    return (
        <div className="flex flex-col items-center gap-6 py-4 animate-in fade-in zoom-in duration-300">
            <div className="text-center">
                <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[11px] font-bold mb-2 uppercase">
                    check-in
                </div>
                <Typography.Title level={4} className="m-0">
                    체크인 QR 코드
                </Typography.Title>
            </div>

            <div className="p-4 bg-white rounded-2xl shadow-lg border border-slate-100">
                <QRCodeSVG
                    value={qrValue}
                    size={200}
                    level="H"
                    marginSize={2}
                />
            </div>

            <div className="text-center bg-slate-50 p-4 rounded-2xl w-full">
                <p>보호자가 스캔 후</p>
                <p>
                    <span className="font-bold text-slate-800">실시간 이용시간</span>을 확인할 수 있습니다.
                </p>
            </div>
        </div>
    )
}