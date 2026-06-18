'use client'

import { Product } from "@/features/owner/my-store/product/model"
import { Typography } from "antd"
import { QRCodeSVG } from "qrcode.react"
import { QrCode, AlertTriangle } from "lucide-react";

interface QrCodeDisplayViewProps {
    qrValue: string
    selectedProduct: Product
}


export function QrCodeDisplayView({ qrValue, selectedProduct }: QrCodeDisplayViewProps) {
    return (
        <div className="flex flex-col items-center gap-6 py-4 animate-in fade-in zoom-in duration-300">
            <div className="text-center flex flex-col items-center">
                <div className=" px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[11px] font-bold mb-2 uppercase">
                    check-in
                </div>
                <Typography.Title level={3} className="m-0! text-emerald-600!">
                    {selectedProduct.name}
                </Typography.Title>
                <Typography.Text type="secondary" className="text-base">
                    아래 QR 코드를 스캔하여 체크인하세요
                </Typography.Text>
            </div>

            <div className="relative group p-1 rounded-3xl bg-linear-to-tr from-emerald-500 to-teal-400 shadow-xl shadow-emerald-100/50">
                <div className="p-4 bg-white rounded-3xl">
                    <QRCodeSVG
                        value={qrValue}
                        size={200}
                        level="H"
                        marginSize={2}
                    />
                </div>
            </div>

            <div className="w-full flex flex-col gap-3 mt-2">
                
                <div className="flex items-start gap-3 bg-slate-50 border border-slate-100 p-4 rounded-2xl text-left">
                    <QrCode className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-600 leading-relaxed m-0">
                        보호자가 스마트폰으로 스캔하면 <span className="font-bold text-slate-800">입장 등록</span> 및 <span className="font-bold text-emerald-600">실시간 이용 시간 확인</span>이 시작됩니다.
                    </p>
                </div>

                <div className="flex items-start gap-3 bg-amber-50/60 border border-amber-100 p-4 rounded-2xl text-left">
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-1 w-full">
                        <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">초과 요금 정책</span>
                        <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-slate-500">추가 이용료</span>
                            <span className="text-sm font-bold text-slate-800">
                                {selectedProduct.overtime_unit_mins}분당 {selectedProduct.overtime_unit_price.toLocaleString()}원
                            </span>
                        </div>
                        <div className="flex justify-between items-center border-t border-amber-200/40 pt-1.5 mt-0.5">
                            <span className="text-xs text-slate-500">입장 유예 시간</span>
                            <span className="text-xs font-semibold text-amber-700">
                                {selectedProduct.grace_period_mins}분 제공
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}    