'use client'

import { Modal, Form } from 'antd';
import { ProductWithCategory, UpdateProductData } from "@/features/owner/my-store/product/model";
import { ProductForm } from '@/features/owner/my-store/product/ui';

export function EditProductModal({
    open,
    onClose,
    product,
    onUpdate,
    shopId,
    isPending
}: {
    open: boolean,
    onClose: () => void,
    product: ProductWithCategory | null,
    onUpdate: (id: string, values: UpdateProductData) => void,
    shopId: string
    isPending: boolean
}) {
    const [form] = Form.useForm();

    if (product && open) {
        form.setFieldsValue({
            ...product,
        })
    }

    if (!product) return null

    if (product && open) {
        form.setFieldsValue({
            name: product.name,
            price: product.price,
            is_active: product.is_active,
            category_id: product.category_id,
            duration_minutes: product.duration_minutes,
            overtime_unit_mins: product.overtime_unit_mins,
            overtime_unit_price: product.overtime_unit_price,
            grace_period_mins: product.grace_period_mins
        })
    }

    return (
        <Modal title="상품 수정" open={open} onCancel={onClose} footer={null} centered 
            className='max-h-[70vh]! overflow-y-auto scrollbar-none'
        >
            <ProductForm
                form={form}
                shopId={shopId}
                initialValues={{...product, is_active: product.is_active ?? true}}
                onSubmit={(values) => onUpdate(product.id, values as UpdateProductData)}
                onCancel={onClose}
                isPending={isPending}
            />
        </Modal>
    )
}