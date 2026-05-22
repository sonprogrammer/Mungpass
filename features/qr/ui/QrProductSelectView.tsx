'use client'

import { ProductWithCategory } from "@/features/owner/my-store/product/model/types";
import { Button, Empty, Typography } from "antd"

interface QrProductSelectViewProps {
    selectedCategoryName: string;
    filteredProducts: ProductWithCategory[]
    onSelectProduct: (productId: string) => void
}


export function QrProductSelectView({ selectedCategoryName, filteredProducts, onSelectProduct }: QrProductSelectViewProps) {
    return (
        <div className="flex flex-col gap-3">
            <div className="bg-slate-50 p-3 rounded-xl mb-1 flex justify-between">
                <Typography.Text className="text-[11px]  block!">선택된 유형</Typography.Text>
                <Typography.Text className="font-bold text-orange-500!">{selectedCategoryName}</Typography.Text>
            </div>
            <Typography.Text className="text-slate-500 text-sm">상세 상품을 선택하세요.</Typography.Text>


            {filteredProducts.map(prod => (
                <Button
                    key={prod.id}
                    block
                    size="large"
                    className="h-14 text-left justify-start font-medium"
                    onClick={() => onSelectProduct(prod.id)}
                >
                    {prod.name}
                </Button>
            ))}
            {(filteredProducts.length === 0) && (
                <Empty description="이 카테고리에 등록된 상품이 없습니다." />
            )}
        </div>
    )
}