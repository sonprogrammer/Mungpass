'use client'
import { useState } from 'react';
import { BottomSheet } from "@/shared/ui/place/BottomSheet";

import { Button, Form } from 'antd';
import {  Plus } from 'lucide-react';
import { ProductList } from '@/entities/owner/product/ui/ProductList';
import { AddProduct } from '@/features/owner/my-store/product/ui/AddProduct'
import { useGetProducts } from '@/features/owner/my-store/product/model/useGetProducts';
import { ProductSubmitData } from '@/features/owner/my-store/product/model/types';
import { usePostProduct } from '@/features/owner/my-store/product/model/usePostProduct';
import { useDeleteProduct } from '@/features/owner/my-store/product/model/useDeleteProduct';

export function ProductManageBottomSheet({ open, onClose, shopId }: { open: boolean, onClose: () => void, shopId: string }) {
    const [form] = Form.useForm()
    const [addModal, setAddModal] = useState(false)


    //* 가져온 상품 데이터
    const {data : productsData =[]} = useGetProducts(shopId)
    // * 상품 등록
    const { mutate : addProduct, isPending: isPostPending} = usePostProduct()
    // * 상품 삭제
    const { mutate: deleteProduct} = useDeleteProduct()

    
    const handleAdd = (product: ProductSubmitData) => {
        addProduct({shopId, productData: product}, {
            onSuccess: () => {
                setAddModal(false)
                form.resetFields()
            }
        })
    }

    const handleDelete = (productId: string) => {
        deleteProduct({productId: productId, shopId})
    }

    return (
        <BottomSheet isOpen={open} onClose={() => {
            onClose()
             setAddModal(false)}}>
            <div className="flex flex-col h-full pb-6">
                <header className="px-1 flex items-center justify-between mb-4">
                    <div>

                        <h2 className="text-2xl font-black text-slate-800">
                            {addModal? '새 이용권 등록' : '가게 이용권 관리'}
                        </h2>
                        <p className="text-sm text-slate-400 font-medium mt-1">
                            {addModal ? '새로운 이용권 정보를 입력해주세요' : '운영중인 이용권을 확인하고 관리하세요'}
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

                <div className="flex-1 min-h-0">
                    {addModal ? (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 h-full">
                            <AddProduct form={form} isPostPending={isPostPending} add={handleAdd} setAddModal={setAddModal} shopId={shopId} />
                        </div>
                    ) : (
                        <div className="animate-in fade-in duration-300 pb-5 h-full">
                            <ProductList
                                products={productsData}
                                onDelete={handleDelete}
                            />
                        </div>
                    )}
                </div>
            </div>
        </BottomSheet>
    )
}