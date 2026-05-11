'use client'

export const dynamic = 'force-dynamic'

import { useStoreRegistrationStore } from "@/features/auth/model/owner/useStoreRegistStore"
import { BusinessForm } from "@/features/auth/ui/owner/BusinessForm"
import { RegisterStoreCheckCard } from "@/features/auth/ui/owner/RegisterStoreCheckCard"
import { App } from "antd"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect } from "react"


export function AuthContent() {
    const searchParams = useSearchParams()
    const selectedPlace = useStoreRegistrationStore(state=> state.selectedPlace)
    const hasHydrated = useStoreRegistrationStore(state => state.hasHydrated)
    const router = useRouter()
    const { message } = App.useApp()

    
    useEffect(() => {
        if(hasHydrated && !selectedPlace){
            message.error('선택된 매장이 없습니다. 다시 선택해주세요')
            router.back()
        }
    }, [hasHydrated, selectedPlace, router, message])

    const ownerId = searchParams.get('ownerId')
  

    return (
        <div className="flex flex-col gap-8 px-6 py-4 animate-in fade-in slide-in-from-right-5 duration-500">

            <h2 className="text-2xl font-black text-slate-800 leading-tight">
                파트너님,<br /><span className="text-orange-500">사업자 등록증을 등록해주세요</span>
            </h2>

            {/* //*선택된 가게 정보 */}
            <RegisterStoreCheckCard 
                place_name={selectedPlace?.place_name}
                address_name={selectedPlace?.address_name}
                phone={selectedPlace?.phone}
            />
            

            {/* //*사업자 인증 폼 */}
            <div className="space-y-2">
                <div className="px-2">
                    <h3 className="text-lg font-black text-slate-800">사업자 인증</h3>
                    <p className="text-sm text-slate-500">국세청에 등록된 정확한 정보를 입력해주세요.</p>
                </div>

                <BusinessForm storeInfo={selectedPlace} ownerId={ownerId}/>
            </div>
        </div>
    )
}

export default function OwnerAuthPage() {
    return(
        <Suspense fallback={<div>인증 정보를 불러오는 중입니다...</div>}>
            <AuthContent />
        </Suspense>
    )
}