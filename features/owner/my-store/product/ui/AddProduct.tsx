'use client'

import { ProductSubmitData } from "@/features/owner/my-store/product/model";
import { ProductForm } from "@/features/owner/my-store/product/ui";
import { FormInstance} from "antd";

interface AddProductProps{
    add: (product: ProductSubmitData) => void; 
    onCancel: () => void
    form: FormInstance
    shopId: string
    isPostPending:boolean 
}


export function AddProduct({ add, onCancel, form, shopId, isPostPending }: AddProductProps) {


   

    return (
        <ProductForm 
            form={form}
            shopId={shopId}
            onSubmit={add}
            isPending={isPostPending}
            onCancel={onCancel}
        />
    )
}