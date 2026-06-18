'use client'

import { usePathname } from "next/navigation"
import {
    LayoutGrid,
    Store,
    ClipboardCheck,
    BarChart3,
    QrCode,
} from "lucide-react"
import { NavItem, QrModal } from "@/widgets/owner/ui"
import { useCallback, useMemo, useState } from "react"
import { useGetShopInfo, useOwnerStoreStatus } from "@/entities/owner/model"
import { useGetProducts } from "@/features/owner/my-store/product/model/useGetProducts"
import { Product } from "@/features/owner/my-store/product/model"




export function OwnerNavbar() {
    const [isQrModalOpen, setIsQrModalOpen] = useState<boolean>(false)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const pathname = usePathname()

    const { data} = useGetShopInfo()
    const isVerified = useOwnerStoreStatus(state => state.isVerified)
    
    const shopId = data?.id

    const { data: rawProducts=[], isPending: isProductsPending} = useGetProducts(shopId)
    //* 현재 활성화된 상품만 보여줌. 삭제된건 api요청단에서 막아놈
    const products = useMemo(() => rawProducts.filter(p => p.is_active), [rawProducts])

    
    const isQrActive = pathname === '/owner/qr'

    const handleCloseQrModal = useCallback(() => {
        setIsQrModalOpen(false)
        setSelectedProduct(null)
    },[])

    const handleSelectedProduct = useCallback((product: Product| null) => {
        setSelectedProduct(product)
    },[])


    
    const qrValue = useMemo(() => {
        // * 배포환경, 개발 환경 다르게 
        const origin = typeof window !== 'undefined'
            ? window.location.origin
            : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
        if(!selectedProduct) return ''
        return `${origin}/user?modal=checkin&shopId=${shopId}&productId=${selectedProduct.id}` 
    },[shopId, selectedProduct])



    return (
        <>
            <nav className=" w-full max-w-120 bg-slate-50/90 backdrop-blur-2xl border-t border-slate-200 px-6 py-3 flex items-center z-50 rounded-t-[2.5rem] shadow-[0_-10px_30px_-5px_rgba(0,0,0,0.05)]">
                <div className="grid grid-cols-5 items-end w-full">

                    <NavItem
                        href="/owner"
                        label="대시보드"
                        icon={LayoutGrid}
                        active={pathname === '/owner'}
                    />
                    <NavItem
                        href="/owner/usage"
                        label="이용현황"
                        icon={ClipboardCheck}
                        active={pathname === '/owner/usage'}
                    />

                    <div className="flex flex-col items-center -mt-11">
                        <button
                            type="button"
                            onClick={() => setIsQrModalOpen(true)}
                            className="group flex flex-col items-center cursor-pointer">
                            <div className={`relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-white transition-all duration-300
                                    ${isQrActive
                                    ? 'bg-emerald-600 scale-[1.03] shadow-[0_14px_30px_rgba(16,185,129,0.32)]'
                                    : 'bg-emerald-500 shadow-[0_12px_26px_rgba(16,185,129,0.24)] hover:scale-[1.03] hover:bg-emerald-600'}
                                        `}>
                                <div className="absolute inset-0 rounded-full bg-white/10" />
                                <QrCode className="relative h-10 w-10 text-white" />
                            </div>
                            <span className={`mt-1.5 text-[11px] font-semibold tracking-tight ${isQrActive ? 'text-emerald-700' : 'text-slate-500'
                                }`}>QR체크인</span>
                        </button>
                    </div>

                    <NavItem
                        href="/owner/stats"
                        label="실적통계"
                        icon={BarChart3}
                        active={pathname === '/owner/stats'}
                    />

                    <NavItem
                        href="/owner/my-store"
                        label="매장관리"
                        icon={Store}
                        active={pathname === '/owner/my-store'}
                    />
                </div>

            </nav>

            <QrModal products={products} isPending={isProductsPending} qrValue={qrValue} 
                    selectedProduct={selectedProduct} open={isQrModalOpen} onClose={handleCloseQrModal} 
                    onSelectProduct={handleSelectedProduct}
                    isVerified={isVerified}
                    />

        </>

    )
}