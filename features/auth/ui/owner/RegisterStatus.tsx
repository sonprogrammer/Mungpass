import { StepStatus } from "@/features/auth/ui/owner/StepStatus";


export function RegisterStatus() {
    return (
        <div className="w-full bg-white rounded-4xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4">진행 현황</h3>
            <div className="space-y-6">
                <StepStatus done title="가입 정보 및 서류 제출" desc="방금 완료됨" />
                <StepStatus active title="관리자 서류 심사" desc="서류 대조 및 적합성 검토 중" />
                <StepStatus title="멍패스 사장님 입점 완료" desc="서비스 노출 및 예약 관리 시작" />
            </div>
        </div>
    )
}