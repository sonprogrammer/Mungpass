'use client'

import { ProductCard } from "@/entities/owner/product/ui/ProductCard"
import { Empty } from "antd"

export function ProductList({products, onDelete}: {products: any[], onDelete: (id: string) => void}) {
    if(products.length === 0) {
        return(
            <div className="py-20">
                <Empty description="상품을 등록해주세요" />
            </div>
        )
    }
    return(
        <div className="flex flex-col gap-3">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} onDelete={onDelete} />
            ))}
        </div> 
    )
}