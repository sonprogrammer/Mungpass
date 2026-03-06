'use client'

import { RegisterStoreCheckCardProps } from "@/features/auth/model/types";
import { Info, MapPin, Phone } from "lucide-react";


export function RegisterStoreCheckCard({place_name, phone, address_name}: RegisterStoreCheckCardProps) {
    return(
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