'use client'

import { ProductCategory, ProductWithCategory } from "@/features/owner/my-store/product/model/types"
import { useGetProductCategories } from "@/features/owner/my-store/product/model/useGetProductCategories"
import { useGetProducts } from "@/features/owner/my-store/product/model/useGetProducts"
import { App, Empty } from "antd"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { KioskProductSkeleton } from "@/features/owner/kiosk/ui/KioskProductSkeleton"
import { ProductListItem } from "@/entities/owner/kiosk/ui/ProductListItem"
import { KioskHeader } from "@/widgets/owner/kiosk/ui/KioskHeader"
import { KioskCategoryNav } from "@/widgets/owner/kiosk/ui/KioskCategoryNav"
import { KioskQrSection } from "@/widgets/owner/kiosk/ui/KioskQrSection"
import { Key } from "lucide-react"
import { useRouter } from "next/navigation"
import { KioskAuthModal } from "@/features/owner/kiosk/ui/KioskAuthModal"


export default function KioskPage() {
    const [step, setStep] = useState<'product' | 'qr'>('product')
    const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null)
    const [selectedProduct, setSelectedProduct] = useState<ProductWithCategory | null>(null)
    const [isAuthOpen, setIsAuthOpen] = useState(false)
    
    const router = useRouter()
    const params = useParams()
    const shopId = params.shopId as string

    const { data: products = [], isPending: isProductPending } = useGetProducts(shopId)
    const { data: categories = [], isPending: isCategoryPending } = useGetProductCategories(shopId)

    const { message} = App.useApp()

    const currentCategory = selectedCategory ?? categories[0] ?? null

    const filteredProducts = useMemo(() => {
        if (!currentCategory || !products.length) return []
        return products.filter(p => String(p.category_id) === String(currentCategory.id))
    }, [products, currentCategory])

    // * 배포환경, 개발 환경 다르게 
    const getBaseUrl = () => {
        if(typeof window !== 'undefined'){
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
    }, [])
    return (
        <div className='h-full flex flex-col relative'>
            <KioskHeader />

            {/* //* 카테고리 선택 창 */}
            <KioskCategoryNav
                categories={categories}
                currentCategoryId={currentCategory?.id}
                isPending={isCategoryPending}
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
                                <div className="flex flex-col items-center justify-center py-32 bg-white rounded-4xl border-2 border-dashed border-slate-200">
                                    <Empty description={<span className="text-slate-400 font-medium">{`준비된 ${currentCategory?.name} 상품이 없습니다.`}</span>} />
                                </div>
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

            {/* //*관리자 페이지로 복귀하는 버튼 */}
            <button
                title='관리자 페이지로 이동'
                type='button'
                className="fixed bottom-6 left-6 w-8 h-8 cursor-pointer flex items-center justify-center bg-slate-400 text-slate-200 rounded-full hover:bg-slate-800 hover:text-white transition-all shadow-sm active:scale-95"
                onClick={() => setIsAuthOpen(true)}
            >
                <Key size={20} />
            </button>
            
            {/* //* 비밀번호 확인후 사장페이지로 이동가능 */}
            <KioskAuthModal 
                shopId={shopId}
                isOpen={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
                onSuccess={ () => {
                    setIsAuthOpen(false)
                    router.replace('/owner')
                }}
            />
            
        </div>
    )
}