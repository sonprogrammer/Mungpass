'use client'

import { BusinessForm } from "@/features/auth/ui/owner/BusinessForm"
import { useSearchParams } from "next/navigation"


export default function OwnerAuthPage() {
    const searchParams = useSearchParams()

    const storeName = searchParams.get('name')
    const storeId = searchParams.get('id')

    return (
        <div className="flex flex-col gap-8 px-6 py-4 animate-in fade-in slide-in-from-right-5 duration-500">
            {/* 선택된 가게 요약 정보 */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-orange-100">
                <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-1">Step 01 장소 확인</p>
                <h2 className="text-2xl font-black text-slate-800">{storeName || '가게 정보 없음'}</h2>
                <p className="text-xs text-slate-400 mt-1">선택하신 가게가 본인 소유의 사업장이 맞는지 확인해주세요.</p>
            </div>

            {/* 2단계: 사업자 인증 폼 */}
            <div className="space-y-2">
                <div className="px-2">
                    <h3 className="text-lg font-black text-slate-800">사업자 인증</h3>
                    <p className="text-sm text-slate-500">국세청에 등록된 정확한 정보를 입력해주세요.</p>
                </div>

                <BusinessForm storeId={storeId} />
            </div>
        </div>
    )
}