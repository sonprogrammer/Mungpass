'use client'

import { RegisterStoreCheckCardProps } from "@/features/auth/model";
import { useStoreRegistrationStore } from "@/features/auth/model/owner";
import { Info, MapPin, Phone } from "lucide-react";
import { useRouter } from "next/navigation";


export function RegisterStoreCheckCard({ place_name, phone, address_name, isEdit, ownerId }: RegisterStoreCheckCardProps) {
    const setSelectedPlace = useStoreRegistrationStore(state => state.setSelectedPlace)
    const router = useRouter()

    const handleFind = () => {
        if(isEdit){
            setSelectedPlace(null)
            router.push(`/signup/owner/store?ownerId=${ownerId}&mode=edit`)
        }else{
            setSelectedPlace(null)
        }
    }
    
    return (
        <div className="bg-white rounded-3xl p-6 border border-orange-100 ">

            <div className="relative">
                <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-1">Step 01 장소 확인</p>

                <h2 className="text-2xl font-black text-slate-800">
                    {place_name || '가게 정보 없음'}
                </h2>

                <div className="space-y-2">
                    <div className="flex items-start gap-2.5 text-slate-500">
                        <MapPin className="w-4 h-4 mt-0.5 text-slate-400" />
                        <p className="text-sm font-medium">
                            {address_name || '주소 정보가 없습니다.'}
                        </p>
                    </div>

                    <div className="flex items-center gap-2.5 text-slate-500">
                        <div className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl border transition-colors ${phone ? 'border-slate-100 bg-slate-50/50' : 'border-dashed border-slate-200'}`}>
                            <Phone className={`w-3.5 h-3.5 ${phone ? 'text-orange-500' : 'text-slate-300'}`} />
                            <span className={`text-xs font-bold ${phone ? 'text-slate-700' : 'text-slate-400'}`}>
                                {phone || '전화번호 미등록'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                    <span className="text-xs text-gray-500">찾으시는 매장이 아닌가요?</span>
                    <button
                        onClick={handleFind}
                        className="text-xs cursor-pointer font-bold text-blue-600 px-2 py-1 border border-blue-200 rounded-md"
                    >
                        다시 찾기
                    </button>
                </div>

                <div className="pt-4 border-t border-slate-50">
                    <p className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5">
                        <Info className="w-3 h-3" />
                        선택하신 가게가 본인 소유의 사업장이 맞는지 확인해주세요.
                    </p>
                </div>
            </div>
        </div>
    )
}