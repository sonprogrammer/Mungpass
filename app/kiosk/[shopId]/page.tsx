'use client'

import { ProductCategory, ProductWithCategory } from "@/features/owner/my-store/product/model/types"
import { useGetProductCategories } from "@/features/owner/my-store/product/model/useGetProductCategories"
import { useGetProducts } from "@/features/owner/my-store/product/model/useGetProducts"
import { Button, Empty } from "antd"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { AlertCircle, ChevronLeft, QrCode } from "lucide-react"
import { KioskCategorySkeleton } from "@/features/owner/kiosk/ui/KioskCategorySkeloton"
import { KioskProductSkeleton } from "@/features/owner/kiosk/ui/KioskProductSkeleton"
import { ProductListItem } from "@/entities/owner/kiosk/ui/ProductListItem"
import { QRCodeSVG } from "qrcode.react"


export default function KioskPage() {
    const [step, setStep] = useState<'product' | 'qr'>('product')
    const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null)
    const [selectedProduct, setSelectedProduct] = useState<ProductWithCategory | null>(null)

    const params = useParams()
    const shopId = params.shopId as string

    const { data: products = [], isPending: isProductPending } = useGetProducts(shopId)
    const { data: categories = [], isPending: isCategoryPending } = useGetProductCategories(shopId)

    console.log('products', products)
    // console.log('categories', categories)
    // console.log('selectedCategory', selectedCategory)

    const currentCategory = selectedCategory ?? categories[0] ?? null

    const filteredProducts = useMemo(() => {
        if (!currentCategory || !products.length) return []
        return products.filter(p => String(p.category_id) === String(currentCategory.id))
    }, [products, currentCategory, categories])

    // console.log('currentCategory', currentCategory)
    // console.log('filteredProducts', filteredProducts)

    const handleBack = () => {
        if (step === 'qr') setStep('product')
    }
    const qrValue = `${process.env.NEXT_PUBLIC_SITE_URL}/user?modal=checkin&shopId=${shopId}&productId=${selectedProduct?.id}`
    return (
        <div className='h-full flex flex-col'>
            <header className="p-8 border-b flex items-center justify-center relative">
                <div className="flex flex-col items-center font-black absolute left-10">
                    <div className="flex gap-1 text-[16px]">
                        <h1 className="text-emerald-500 font-black">멍</h1>
                        <h1>PASS</h1>
                    </div>
                    <div className="uppercase text-[10px] -m-1.25">
                        kiosk
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-center">체크인 키오스크</h1>
            </header>

            {/* //* 카테고리 선택 창 */}
            <section>
                {isCategoryPending && (
                    <KioskCategorySkeleton />
                )}
                <div className="grid grid-cols-3 w-full">
                    {categories.map((c) => {
                        const isActive = currentCategory?.id === c.id
                        return (
                            <Button
                                key={c.id}
                                onClick={() => {
                                    setSelectedCategory(c)
                                    setStep('product')
                                }}
                                className={`py-10! text-2xl! font-bold! rounded-3xl shadow-md! hover:bg-slate-50! hover:text-orange-500! transition-transform! ${isActive ? 'bg-orange-400! text-white! shadow-lg!' : ''}`}
                            >
                                {c.name}
                            </Button>
                        )
                    })}
                    {categories.length === 0 && <p>등록된 카테고리가 없습니다.</p>}
                </div>
                <div>
                </div>
            </section>

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
                        <div className="flex items-center py-6 animate-in zoom-in-95 duration-500">
                            <div className="bg-white p-12 rounded-[4rem] shadow-2xl flex flex-col items-center gap-8 border-2 border-emerald-100">
                                <Button
                                    block
                                    className=" rounded-full! text-2xl! font-black! bg-slate-500! text-white! border-none! shadow-2xl! active:scale-95 transition-all"
                                    onClick={() => { setStep('product'); setSelectedCategory(null); }}
                                >
                                    <ChevronLeft className="h-6 w-6"/>
                                </Button>
                                <div className="text-center space-y-2">
                                    <h2 className="text-4xl font-black text-slate-900">{selectedProduct?.name}</h2>
                                    <p className="text-2xl font-bold text-emerald-500">{selectedProduct?.price.toLocaleString()}원</p>
                                </div>

                                <div className="p-6 bg-slate-50 rounded-[2.5rem] border-4 border-emerald-500/20">
                                    <QRCodeSVG value={qrValue} size={300} level="H" includeMargin={true} />
                                </div>

                                <div className="bg-amber-50 p-6 rounded-4xl border border-amber-100 flex gap-4 max-w-sm">
                                    <AlertCircle className="w-6 h-6 text-amber-500 shrink-0" />
                                    <p className="text-amber-900 font-medium leading-relaxed">
                                        보호자 앱에서 위 QR을 스캔하면<br />
                                        <span className="font-black text-amber-600">입실 처리와 결제</span>가 진행됩니다.
                                    </p>
                                </div>
                            </div>


                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}