'use client'

import { useStoreRegistrationStore } from "@/features/auth/model/owner"
import { BusinessForm, RegisterStoreCheckCard } from "@/features/auth/ui/owner"
import { LoadingFallback } from "@/shared/ui/Loader"
import { App } from "antd"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"


export function OwnerAuthWidget() {
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

    // *ownerId가 없을시 튕김
        useEffect(() => {
            if(!ownerId){
                message.error('잘못된 접근입니다. 다시 로그인해주세요')
                router.replace('/')
            }
        },[ownerId, router, message])
  
        // *ownerId가 없으면 얼리 리턴해주기
    if (!hasHydrated || !ownerId || !selectedPlace) {
        return <LoadingFallback text='정보를 확인 중입니다...'/>
    }

    return (
        <div className="flex flex-col gap-8 px-6 py-4 animate-in fade-in slide-in-from-right-5 duration-500">

            <h2 className="text-2xl font-black text-slate-800 leading-tight">
                파트너님,<br /><span className="text-orange-500">사업자 등록증을 등록해주세요</span>
            </h2>

            {/* //*선택된 가게 정보 */}
            {/* //TODO 스켈레톤 해주기 */}
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

                <BusinessForm storeInfo={selectedPlace} ownerId={ownerId} isEdit={false}/>
            </div>
        </div>
    )
}
