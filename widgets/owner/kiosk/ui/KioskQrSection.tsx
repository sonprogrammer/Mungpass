'use client'

import { AlertCircle, ChevronLeft } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import { ProductWithCategory } from "@/features/owner/my-store/product/model/types"

interface Props {
    product: ProductWithCategory
    qrValue: string
    onBack: () => void
}

export function KioskQrSection({ product, qrValue, onBack }: Props) {
    return (
        <div className="py-6 animate-in zoom-in-95 duration-500">
            <div className="bg-white p-12 rounded-[4rem] shadow-2xl flex justify-between border-2 border-emerald-100">
                <div className="flex justify-center gap-5 flex-1 relative">
                    <button
                        type="button"
                        className="absolute left-0 w-16 h-16 rounded-full cursor-pointer flex items-center justify-center bg-slate-500 text-white border-none hover:bg-slate-700 group shadow-2xl active:scale-90 transition-all duration-200"
                        onClick={onBack}
                    >
                        <ChevronLeft size={32} strokeWidth={3} className="transition-transform duration-200 group-hover:-translate-x-1" />
                    </button>

                    <div className="flex flex-col gap-6 justify-center">
                        <div className="text-center space-y-2">
                            <h2 className="text-4xl font-black text-slate-900">{product.name}</h2>
                            <p className="text-2xl font-bold text-emerald-500">{product.price.toLocaleString()}원</p>
                        </div>
                        <div className="bg-amber-50 p-6 rounded-4xl border border-amber-100 flex gap-4 max-w-sm">
                            <AlertCircle className="w-6 h-6 text-amber-500 shrink-0" />
                            <p className="text-amber-900 font-medium leading-relaxed">
                                보호자 앱에서 반려견을 선택 후 QR을 스캔하여
                                <span className="font-black text-amber-600"> 입실 처리</span>를 완료해 주세요.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-slate-50 rounded-[2.5rem] border-4 border-emerald-500/20">
                    <QRCodeSVG value={qrValue} size={300} level="H" includeMargin={true} />
                </div>
            </div>
        </div>
    )
}