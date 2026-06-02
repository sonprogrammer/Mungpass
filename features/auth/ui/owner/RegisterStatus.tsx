'use client'

import { useCheckStoreStatus } from "@/features/auth/model/owner";
import { StepStatus } from "@/features/auth/ui/owner";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";


export function RegisterStatus({ownerId}: {ownerId: string}) {
    //* store_registrations 테이블에 등록된거
    const {data, isPending} = useCheckStoreStatus(ownerId)


    if (isPending) {
        return (
            <div className="w-full bg-white rounded-4xl p-10 flex flex-col items-center justify-center border border-slate-100 shadow-sm">
                <Loader2 className="animate-spin text-orange-500 mb-2" size={24} />
                <p className="text-sm text-slate-400 font-medium">진행 현황 불러오는 중...</p>
            </div>
        )
    }

    if(!data) return null

    const { status, store_name, rejection_reason, submitted_at } = data
    
    return (
        <div className="w-full bg-white rounded-4xl p-6 shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">진행 현황</h3>
                <span className="text-[10px] font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-md">
                    {store_name}
                </span>
            </div>

            <div className="space-y-6">
                {/* //* 가입 정보 및 서류제출 현황 */}
                <StepStatus 
                    done 
                    title="가입 정보 및 서류 제출" 
                    desc="정상적으로 접수되었습니다" 
                    date={format(submitted_at, 'yy.MM.dd')}
                />
                {/* //* 관리자 서류 심사 */}
                <StepStatus 
                    done={status === 'APPROVED'} 
                    active={status === 'PENDING' || status === 'REJECTED'} 
                    title={status === 'REJECTED' ? "서류 심사 반려" : "관리자 서류 심사"}
                    desc={
                        status === 'PENDING' ? "서류 대조 및 적합성 검토 중" :
                        status === 'REJECTED' ? (rejection_reason || "반려 사유를 확인해주세요") :
                        "심사가 완료되었습니다"
                    }
                    isError={status === 'REJECTED'}
                />
                {/* //* 입점 성공 여부 */}
                <StepStatus 
                    done={status === 'APPROVED'}
                    active={status === 'APPROVED'}
                    title="멍패스 사장님 입점 완료" 
                    desc={status === 'APPROVED' ? "이제 서비스를 이용하실 수 있습니다!" : "심사 승인 후 즉시 완료됩니다"} 
                />
            </div>
        </div>
    )
}