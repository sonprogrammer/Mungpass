'use client'
import { useState } from 'react';
import { BottomSheet } from "@/shared/ui/place/BottomSheet";

import { Button, Form, Input, InputNumber, Divider } from 'antd';
import { ChevronLeft, HelpCircle, Plus, Save, Sparkles } from 'lucide-react';
import { ProductList } from '@/entities/owner/product/ui/ProductList';
import { AddProduct } from '@/features/owner/my-store/ui/AddProduct';

export function ProductManageBottomSheet({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [form] = Form.useForm()
    const [addModal, setAddModal] = useState(false)
    const [products, setProducts] = useState([
        { id: '1', name: '유치원 6시간', duration: 360, price: 35000, extraMinute: 10, extraPrice: 1000 },
    ])

    const handleAdd = (values: any) => {
        setProducts([...products, { ...values, id: Date.now().toString() }]);
        form.resetFields();
    };

    return (
        <BottomSheet isOpen={isOpen} onClose={() => {
            onClose()
             setAddModal(false)}}>
            <div className="flex flex-col  pb-10">
                <header className="px-1 flex items-center justify-between mb-4">
                    <div>

                        <h2 className="text-2xl font-black text-slate-800">
                            {addModal? '새 상품 등록' : '가게 상품 관리'}
                        </h2>
                        <p className="text-sm text-slate-400 font-medium mt-1">
                            {addModal ? '새로운 이용 상품 정보를 입력해주세요' : '운영중인 상품을 확인하고 관리하세요'}
                        </p>
                    </div>
                    {!addModal && (
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<Plus size={24} />}
                            onClick={() => setAddModal(true)}
                            className="w-12! h-12! bg-emerald-500! shadow-lg! shadow-emerald-100! flex! items-center! justify-center! hover:scale-105 transition-transform"
                        />
                    )}
                </header>

                <div className="flex-1 overflow-y-auto">
                    {addModal ? (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <AddProduct add={handleAdd} setAddModal={setAddModal} />
                        </div>
                    ) : (
                        <div className="animate-in fade-in duration-300 pb-10">
                            <ProductList
                                products={products}
                                onDelete={(id) => setProducts(products.filter(p => p.id !== id))}
                            />
                        </div>
                    )}
                </div>
            </div>
        </BottomSheet>
    )
}