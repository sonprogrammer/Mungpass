'use client'

import { ProductWithCategory } from "@/features/owner/my-store/product/model";
import { Button, Tag, Switch } from "antd";
import { Banknote, Clock, Trash2 } from "lucide-react";

interface ProductCardProps{
    product: ProductWithCategory, 
    onDelete: (productId: string) => void, 
    onClick: () => void
    onToggle: (checked: boolean) => void
}

export function ProductCard({product, onDelete, onClick, onToggle}: ProductCardProps) {
    return(
        <div
            onClick={onClick}
            className="group cursor-pointer bg-white border border-slate-100 p-5 rounded-3xl shadow-sm hover:border-orange-200 hover:shadow-md transition-all duration-200"
        >
            <div className="flex justify-between items-start gap-4">
                <div className="space-y-2.5 flex-1">
                    <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 text-base">{product.name}</span>
                        {product.product_categories?.name && (
                            <Tag color="orange" className="m-0 border-none rounded-md text-[10px] px-2 py-0.5 font-bold opacity-80">
                                {product.product_categories.name}
                            </Tag>
                        )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-[13px] text-slate-500 font-medium">
                        <div className="flex items-center gap-1">
                            <Clock size={14} className="text-slate-400" /> 
                            {Math.floor(product.duration_minutes / 60)}시간
                        </div>
                        <div className="flex items-center gap-1 font-bold text-emerald-600">
                            <Banknote size={14} /> {product.price.toLocaleString()}원
                        </div>
                    </div>

                    {product.overtime_unit_mins && (
                        <div className="inline-flex items-center gap-1 text-[11px] text-orange-600 font-bold bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100">
                            <span>+ 초과 {product.overtime_unit_mins}분당 {product.overtime_unit_price?.toLocaleString()}원</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col items-center gap-3 shrink-0">
                    <Switch
                        checked={product.is_active}
                        onChange={(checked, e) => {
                            e.stopPropagation();
                            onToggle(checked);
                        }}
                        checkedChildren="판매중"
                        unCheckedChildren="숨김"
                        size="default"
                        className={product.is_active ? "bg-emerald-500!" : "bg-slate-300!"}
                    />
                    
                    {onDelete && (
                        <Button
                            type="text"
                            danger
                            shape="circle"
                            icon={<Trash2 size={16} />}
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(product.id);
                            }}
                            className="hover:bg-rose-50!"
                        />
                    )}
                </div>
            </div>
        </div>
    )
}