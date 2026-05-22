'use client'

import { StepStatus } from "@/features/auth/ui/owner/StepStatus"
import { StoreApprovalTimelineProps } from "@/widgets/owner/my-store/model/types"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { AlertCircle } from "lucide-react"
import { useMemo } from "react"




export function StoreApprovalTimeline({ regisData, currentStatus }: StoreApprovalTimelineProps) {
    const approvalSteps = useMemo(() => {
        const createdAt = format(new Date(regisData.created_at), 'yyyy.MM.dd', { locale: ko })
        const submittedAt = format(new Date(regisData.submitted_at), 'yyyy.MM.dd', { locale: ko })
        const rejectedAt = format(new Date(regisData.rejected_at), 'yyyy.MM.dd', { locale: ko })
        const approvedAt = format(new Date(regisData.approved_at), 'yyyy.MM.dd', { locale: ko })
        const reSubmittedAt = format(new Date(regisData.re_submit_at), 'yyyy.MM.dd', { locale: ko })

        return [
            {
                title: "가입 및 신청",
                desc: `${createdAt} 완료됨`,
                done: true,
                active: false
            },
            {
                title: reSubmittedAt ? '서류 재제출' : "서류 제출",
                desc: reSubmittedAt ? `${reSubmittedAt} 제출` : `${submittedAt} 재제출`,
                done: !!regisData.biz_reg_image_url,
                active: !regisData.biz_reg_image_url
            },
            {
                title: "관리자 검토",
                desc: currentStatus === 'PENDING' ? "현재 서류 확인 중" : currentStatus === 'APPROVED' ? "검토 완료" : `${rejectedAt} 반려됨`,
                done: currentStatus === 'APPROVED',
                active: currentStatus === 'PENDING' || currentStatus === 'REJECTED',
                error: currentStatus === 'REJECTED'
            },
            {
                title: "최종 승인",
                desc: currentStatus === 'APPROVED' ? `${approvedAt} 승인됨` : "대기 중",
                done: currentStatus === 'APPROVED',
                active: false
            },
        ]
    }, [regisData, currentStatus])



    return (
        <div className="space-y-6">
            <div className="rounded-3xl bg-gray-50/50 border border-gray-100 p-6 space-y-6">
                {approvalSteps.map((step, id) => (
                    <div key={id} className="relative">
                        {id !== approvalSteps.length - 1 && (
                            <div className="absolute left-2 top-6 h-9 w-0.5 bg-slate-100" />
                        )}
                        <StepStatus key={id} title={step.title} desc={step.desc} done={step.done} active={step.active} isError={step.error} />
                    </div>
                ))}
            </div>

            {currentStatus === 'REJECTED' && (
                <div className="mb-8 overflow-hidden rounded-2xl border border-rose-100 bg-rose-50/30">
                    <div className="flex items-center gap-2 bg-rose-50 px-4 py-2.5">
                        <AlertCircle size={16} className="text-rose-500" />
                        <h3 className="text-sm font-bold text-rose-700">매장 승인 반려 사유</h3>
                    </div>
                    <div className="p-4">
                        <p className="text-[13px] leading-relaxed text-gray-700 font-medium">
                            {regisData?.rejection_reason || "반려 사유가 등록되지 않았습니다. 관리자에게 문의해주세요."}
                        </p>
                        <div className="mt-3 flex justify-end">
                            <span className="text-[11px] text-rose-400 font-medium">
                                * 내용을 수정하여 재신청해주시기 바랍니다.
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )

}