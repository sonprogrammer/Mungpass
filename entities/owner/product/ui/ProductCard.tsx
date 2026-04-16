'use client'

import { ProductWithCategory } from "@/features/owner/my-store/product/model/types";
import { Button, Tag } from "antd";
import { Banknote, Clock, Trash2 } from "lucide-react";


export function ProductCard({product, onDelete}: {product: ProductWithCategory, onDelete: (productId: string) => void}) {
    return(
        <div className="group bg-white border border-slate-100 p-5 rounded-4xl shadow-sm hover:border-orange-200 transition-all">
            <div className="flex justify-between items-start">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-800 text-base">{product.name}</span>
                        <Tag color="orange" className="m-0 border-none rounded-lg text-[10px] px-2 font-bold">
                            {product.product_categories?.name}
                        </Tag>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
                        <span className="flex items-center gap-1"><Clock size={12}/> {Math.floor(product.duration_minutes/60)}시간</span>
                        <span className="flex items-center gap-1 font-bold text-slate-600"><Banknote size={12}/> {product.price.toLocaleString()}원</span>
                    </div>
                    {product.overtime_unit_mins && (
                        <p className="text-[10px] text-orange-400 font-bold bg-orange-50 px-2 py-1 rounded-lg w-fit">
                            * {product.overtime_unit_mins}분당 {product.overtime_unit_price?.toLocaleString()}원 추가
                        </p>
                    )}
                </div>
                {onDelete && (
                    <Button 
                        type="text" 
                        danger 
                        shape="circle"
                        icon={<Trash2 size={18} />} 
                        onClick={() => onDelete(product.id)}
                        className=" bg-rose-50 hover:bg-rose-100!"
                    />
                )}
            </div>
        </div>
    )
}