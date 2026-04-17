'use client'

import { ProductCard } from "@/entities/owner/product/ui/ProductCard"
import { ProductWithCategory } from "@/features/owner/my-store/product/model/types"
import { Empty } from "antd"
import { useState } from "react"

export function ProductList({ products, onDelete }: { products: ProductWithCategory[], onDelete: (productId: string) => void }) {
    const [selectedCategory, setSelectedCategory] = useState<string>('전체')

    if (products.length === 0) {
        return (
            <div className="py-20">
                <Empty description="상품을 등록해주세요" />
            </div>
        )
    }
    const categories = ['전체', ...new Set(products.map(p => p.product_categories?.name).filter(Boolean))]
    console.log('categories', categories)

    const filteredProducts = selectedCategory === '전체' ? products : products.filter(p => p.product_categories?.name === selectedCategory)
    return (
        <div className="flex flex-col gap-3 overflow-y-auto h-full">
            <div className="sticky top-0 z-10 py-3 bg-white px-3 flex gap-2 overflow-x-auto scrollbar shrink-0">
                {categories.map((c) => {
                    const isActive = selectedCategory === c
                    return (
                        <button
                            key={c}
                            onClick={() => setSelectedCategory(c as string)}
                            className={`whitespace-nowrap rounded-2xl px-4 py-1.5 text-[13px] font-bold transition-all border
                                ${isActive
                                    ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                                    : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                                }`}
                        >
                            {c}
                        </button>
                    )
                }
                )}
            </div>
            <div className="flex flex-col gap-3 px-3">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} onDelete={onDelete} />
                    ))
                ) : (
                    <Empty description="해당 카테고리에 상품이 없습니다." />
                )}
            </div>
        </div>
    )
}