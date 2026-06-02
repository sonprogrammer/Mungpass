'use client'

import { useGetRegisData } from "@/entities/owner/my-shop/model"
import { useStoreRegistrationStore } from "@/features/auth/model/owner"
import { BusinessForm, RegisterStoreCheckCard } from "@/features/auth/ui/owner"
import { AlertCircle, Loader2 } from "lucide-react"


export function ReStoreRegistionWidget() {

    // * 신청한 내역 가져오기
    const { data: registedData, isPending: isRegisPending } = useGetRegisData()
    const selectedPlace = useStoreRegistrationStore(state => state.selectedPlace)


    if (isRegisPending) {
        return (
            // TODO MapLoad 컴포넌트 활용
            <div className="mt-10 flex flex-col items-center justify-center p-10 bg-white rounded-4xl border border-orange-50/50">
                <Loader2 className="w-6 h-6 text-orange-200 animate-spin mb-2" />
                <p className="text-xs text-slate-400 font-medium">제출 내역 가져오는 중...</p>
            </div>
        )
    }

    if (!registedData) {
        return (
            <div className="mt-10 flex flex-col items-center justify-center p-10 bg-white rounded-4xl border border-red-50/50">
                <AlertCircle className="w-6 h-6 text-red-200 mb-2" />
                <p className="text-xs text-slate-400 font-medium">제출 내역을 찾을 수 없습니다.</p>
            </div>
        )
    }

    const registrationTableId = registedData.id
    
    const displayStoreInfo = {
        place_name: selectedPlace?.place_name || registedData.store_name,
        phone: selectedPlace?.phone || registedData.phone,
        address_name: selectedPlace?.address_name || registedData.address_name
    }

    // * 매장을 수정하면 수정된거(selectedPlace) 수정을 안하면 디비에 있던 매장 정보(registedData)
    const currentStoreInfo = selectedPlace || {
        place_name: registedData.store_name,
        address_name: registedData.address_name,
        phone: registedData.phone,
        id: registedData.kakao_place_id, // 카카오 ID
        x: registedData.x,
        y: registedData.y,
        category_name: registedData.category_name,

    }

    return (
        <main className=" ">
            <div className="p-6">

                <header className="mb-8">
                    <h1 className="text-2xl font-black text-slate-800">재 심사 요청</h1>
                    <p className="text-sm text-red-500 font-medium mt-1 bg-red-50 p-3 rounded-xl border border-red-100">
                        반려 사유 : {registedData.rejection_reason}
                    </p>
                </header>

                <section className="space-y-2">
                    <div>
                        <RegisterStoreCheckCard
                            place_name={displayStoreInfo.place_name}
                            phone={displayStoreInfo.phone}
                            address_name={displayStoreInfo.address_name}
                            isEdit={true}
                            ownerId={registedData.owner_id}
                        />
                    </div>
                    <BusinessForm
                        storeInfo={currentStoreInfo}
                        ownerId={registedData.owner_id}
                        isEdit={true}
                        initialBizNumber={registedData.business_number} // 기존 사업자 번호
                        initialBizImg={registedData.biz_reg_image_url} // 기존 등록증 경로
                        registrationTableId={registrationTableId} // 재등록시에는 테이블에 로우가 있으니깐 그 로우에 대한 id값임
                    />
                </section>

            </div>
        </main>
    )
}
