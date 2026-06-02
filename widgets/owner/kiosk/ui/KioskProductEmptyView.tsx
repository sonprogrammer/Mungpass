'use client'


import { KioskProductEmptyViewProps } from "@/widgets/owner/kiosk/model"
import { Empty } from "antd"


export function KioskProductEmptyView({currentCategory}: KioskProductEmptyViewProps) {
    return (
        <div className="flex flex-col items-center justify-center py-32 bg-white rounded-4xl border-2 border-dashed border-slate-200">
            <Empty description={<span className="text-slate-400 font-medium">{`준비된 ${currentCategory?.name} 상품이 없습니다.`}</span>} />
        </div>
    )
}