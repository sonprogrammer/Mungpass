'use client'

import { KioskProductSkeleton, ProductListItem } from "@/features/owner/kiosk/ui"
import { ProductCategory, ProductWithCategory, useGetProductCategories, useGetProducts } from "@/features/owner/my-store/product/model"
import { KioskCategoryNav, KioskExit, KioskHeader, KioskProductEmptyView, KioskQrSection } from "@/widgets/owner/kiosk/ui"
import { App } from "antd"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"


export function KioskWidget() {
    const [step, setStep] = useState<'product' | 'qr'>('product')
    const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null)
    const [selectedProduct, setSelectedProduct] = useState<ProductWithCategory | null>(null)

    const params = useParams()
    const shopId = params.shopId as string

    const { data: products = [], isPending: isProductPending } = useGetProducts(shopId)

    const categories = useMemo(() => {
        const categoryMap = new Map<string, string>()
        products.forEach(p => {
            const category = p.product_categories
            if (p.is_active && category?.id && category?.name) {
                categoryMap.set(String(category.id), category.name)
            }
        })
        return Array.from(categoryMap.entries()).map(([id, name]) => ({
            id, name
        })) as ProductCategory[]


    }, [products])


    const { message } = App.useApp()

    const currentCategory = selectedCategory ?? categories[0] ?? null

    const filteredProducts = useMemo(() => {
        if (!currentCategory || !products.length) return []
        return products.filter(p => String(p.category_id) === String(currentCategory.id))
    }, [products, currentCategory])

    // * 배포환경, 개발 환경 다르게 
    const getBaseUrl = () => {
        if (typeof window !== 'undefined') {
            return window.location.origin
        }
        return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost'
    }


    const qrValue = `${getBaseUrl()}/user?modal=checkin&shopId=${shopId}&productId=${selectedProduct?.id}`

    useEffect(() => {
        window.history.pushState(null, '', window.location.href)

        const handlePopState = () => {
            window.history.pushState(null, '', window.location.href)
            message.error('키오스크에서 뒤로가기를 사용할 수 없습니다')
        }
        window.addEventListener('popstate', handlePopState)

        return () => {
            window.removeEventListener('popstate', handlePopState)
        }
    }, [message])
    return (
        <div className='h-full flex flex-col relative'>
            <KioskHeader />

            {/* //* 카테고리 선택 창 */}
            <KioskCategoryNav
                categories={categories}
                currentCategoryId={currentCategory?.id}
                isPending={isProductPending}
                onSelect={(c) => {
                    setSelectedCategory(c)
                    setStep('product')
                }}
            />

            {/* //* 상품 선택 화면  */}
            <main className="flex-1 p-6">

                <div className="max-w-5xl mx-auto w-full">
                    {step === 'product' ? (
                        <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
                            <div className="grid grid-cols-2 gap-4">
                                {isProductPending ? (
                                    <KioskProductSkeleton />
                                ) : (
                                    filteredProducts.map((p) => (
                                        <div key={p.id} className=" transition-transform active:scale-[0.98]">
                                            <ProductListItem
                                                product={p}
                                                onClick={() => {
                                                    setSelectedProduct(p);
                                                    setStep('qr');
                                                }}
                                            />
                                        </div>
                                    ))
                                )}

                            </div>
                            {!isProductPending && filteredProducts.length === 0 && (
                                <KioskProductEmptyView currentCategory={currentCategory} />
                            )}
                        </div>
                    ) : (
                        // * 큐알
                        selectedProduct && (
                            <KioskQrSection
                                product={selectedProduct}
                                qrValue={qrValue}
                                onBack={() => {
                                    setStep('product')
                                    setSelectedCategory(null)
                                }}
                            />
                        )
                    )}
                </div>
            </main>

            {/* //*사장 페이지로 복귀하는 버튼 */}
            <KioskExit shopId={shopId} />

        </div>
    )
}