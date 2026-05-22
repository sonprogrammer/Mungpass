'use client'

import { QrCategorySelectViewProps } from "@/features/qr/model/types"
import { Button, Empty, Typography } from "antd"
import { ChevronRight } from "lucide-react"


export function QrCategorySelectView({ categories, onSelectCategory }: QrCategorySelectViewProps) {
    return (
        <div className="flex flex-col gap-3">
            <Typography.Text className="text-slate-500 text-sm">이용 유형을 선택하세요.</Typography.Text>
            {categories.map(cat => (
                <Button
                    key={cat}
                    block
                    size="large"
                    className="h-14 flex justify-between items-center text-left"
                    onClick={() => onSelectCategory(cat)}
                >
                    <span className="font-medium">{cat}</span>
                    <ChevronRight size={16} className="text-slate-300" />
                </Button>
            ))}
            {categories.length === 0 && <Empty description="등록된 카테고리가 없습니다." />}
        </div>
    )
}