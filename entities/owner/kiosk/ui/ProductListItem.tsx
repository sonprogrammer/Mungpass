'use client'

import { ProductWithCategory } from "@/features/owner/my-store/product/model/types"
import { AlertCircle, ChevronRight, Clock } from "lucide-react"

interface ProductListItem {
    product: ProductWithCategory
    onClick: (product: ProductWithCategory) => void
}

export function ProductListItem({ product, onClick }: ProductListItem) {
    return (
        <div
            onClick={() => onClick(product)}
            className="group relative flex flex-col justify-between p-8 px-10 rounded-[3rem] bg-white shadow-xl hover:shadow-2xl hover:translate-x-3 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-emerald-500/30"
        >
            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <h3 className="text-3xl font-black text-slate-900 tracking-tight">{product.name}</h3>
                        <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-sm font-black">
                            {product.duration_minutes / 60}시간 기준
                        </span>
                    </div>
                    <p className="text-slate-400 text-lg font-medium">기본 이용 {product.duration_minutes}분 제공</p>
                </div>

                <div className="text-right">
                    <div className="text-4xl font-black text-emerald-500">
                        {product.price.toLocaleString()}원
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-6 py-4 px-6 bg-slate-50 rounded-3xl group-hover:bg-emerald-50/50 transition-colors">
                <div className="flex items-center gap-2 text-slate-500">
                    <Clock className="w-5 h-5 text-slate-400" />
                    <span className="text-base font-bold">
                        유예 시간 <span className="text-slate-900">{product.grace_period_mins}분</span>
                    </span>
                </div>

                <div className="w-px h-4 bg-slate-200" />

                <div className="flex items-center gap-2 text-slate-500">
                    <AlertCircle className="w-5 h-5 text-slate-400" />
                    <span className="text-base font-bold">
                        초과 요금 <span className="text-slate-900">{product.overtime_unit_mins}분당 {product.overtime_unit_price.toLocaleString()}원</span>
                    </span>
                </div>


                <div className="ml-auto">
                    <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                </div>
            </div>
        </div>
    )
}