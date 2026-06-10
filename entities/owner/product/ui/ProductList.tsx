'use client'

import { ProductCard } from "@/entities/owner/product/ui"
import { ProductWithCategory, UpdateProductData } from "@/features/owner/my-store/product/model"
import { Empty } from "antd"
import { useState } from "react"
import { Eye, EyeOff } from 'lucide-react';

interface ProductListProps {
    products: ProductWithCategory[],
    onDelete: (productId: string) => void,
    showHidden: boolean,
    setShowHidden: (h: boolean) => void
    onEdit: (product: ProductWithCategory | null) => void
    activeToggle: (id: string, values: UpdateProductData) => void
}


export function ProductList({ products, onDelete, showHidden, setShowHidden, onEdit, activeToggle }: ProductListProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('전체')

    const categories = ['전체', ...new Set(products.filter(p => showHidden ? (p.is_active === false) : (p.is_active === true)).map(p => p.product_categories?.name).filter(Boolean))]


    const filteredProducts = products.filter((p) => {
        const matchesCategory = selectedCategory === '전체' || p.product_categories?.name === selectedCategory
        const matchesStatus = showHidden ? (p.is_active === false) : (p.is_active === true)
        return matchesCategory && matchesStatus
    })

    const toggleShowHidden = () => {
        setSelectedCategory('전체')
        setShowHidden(!showHidden)
    }

    return (
        <div className="flex flex-col gap-3 overflow-y-auto h-full">
            <div className="sticky top-0 z-10 flex border-b border-slate-100">
                <div className="flex-1 py-3 bg-white px-3 flex gap-2 overflow-x-auto scrollbar shrink-0">
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
                <div className="flex items-center px-3 shrink-0">

                    <button
                        onClick={toggleShowHidden}
                        className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all cursor-pointer
                        ${showHidden
                                ? 'bg-emerald-500 text-white border-emerald-100'
                                : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                            }`}
                        title={showHidden ? "숨김 상품 표시 중" : "숨김 상품 보기"}
                    >
                        {showHidden ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-3 px-3 ">
                {showHidden && (
                    <div className="bg-amber-50 text-amber-600 text-[12px] p-2 rounded-lg text-center font-medium">
                        현재 비활성화된 상품만 보는 중입니다.
                    </div>
                )}
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard key={product.id}
                            product={product}
                            onDelete={onDelete}
                            showHidden={showHidden}
                            onClick={() => onEdit(product)}
                            onToggle={(checked) => activeToggle(product.id, { is_active: checked })}
                        />
                    ))

                ) : (
                    <Empty description="해당 카테고리에 상품이 없습니다." />
                )}
            </div>
        </div>
    )
}