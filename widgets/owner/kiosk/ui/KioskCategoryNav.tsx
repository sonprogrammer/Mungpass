'use client'

import { Button } from "antd"
import { ProductCategory } from "@/features/owner/my-store/product/model"
import { KioskCategorySkeleton } from "@/features/owner/kiosk/ui"

interface Props {
    categories: ProductCategory[]
    currentCategoryId?: string
    isPending: boolean
    onSelect: (category: ProductCategory) => void
}

export function KioskCategoryNav({ categories, currentCategoryId, isPending, onSelect }: Props) {
    if (isPending) return <KioskCategorySkeleton />

    return (
        <nav className="grid grid-cols-3 w-full bg-white border-b">
            {categories.map((c) => {
                const isActive = currentCategoryId === c.id
                return (
                    <Button
                        key={c.id}
                        onClick={() => onSelect(c)}
                        className={`py-10! text-2xl! font-bold! rounded-none! border-none! shadow-none! transition-all ${
                            isActive 
                                ? 'bg-orange-400! text-white! z-10' 
                                : 'bg-white! text-slate-500! hover:bg-slate-50!'
                        }`}
                    >
                        {c.name}
                    </Button>
                )
            })}
        </nav>
    )
}