'use client'

import { ProductCard } from "@/entities/owner/product/ui/ProductCard"
import { ProductWithCategory } from "@/features/owner/my-store/product/model/types"
import { Empty } from "antd"

export function ProductList({products, onDelete}: {products: ProductWithCategory[], onDelete: (productId: string) => void}) {
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