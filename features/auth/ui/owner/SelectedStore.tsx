'use client'

import { useCheckStoreExists } from "@/features/auth/model/owner";
import { KakaoPlace } from "@/shared/model";
import { AlertCircle, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { memo, useState } from "react";


export const SelectedStore = memo(function SelectedStore({ place, onNext, ownerId }: { place: KakaoPlace, onNext: () => void, ownerId: string }) {
    const [showRejectReason, setShowRejectReason] = useState(false);
    const { data: checkResult, isPending, isError } = useCheckStoreExists(place.id, ownerId)

    const getButtonContent = () => {
        if (isPending || !checkResult) {
            return (
                <div className="flex items-center justify-center gap-2">
                    <Loader2 className="flex items-center justify-center gap-2 animate-spin" />
                    <span>가게 확인 중...</span>
                </div>
            )
        }
        if (isError) return '다시 시도해주세요.'
        if (checkResult?.exists) return '이미 등록된 매장입니다.'
        if (checkResult.isPending) return '심사 대기 중인 매장입니다'
        if (checkResult?.isRejectedByMe) return '반려된 기록이 있습니다. 확인해주세요'

        return '이 장소로 등록 시작하기'
    }

    const isDisabled = isPending || isError || checkResult?.exists || checkResult?.isPending

    return (
        <div className="px-6 z-30 animate-in slide-in-from-bottom-10">
            <div className="bg-white rounded-4xl shadow-2xl p-6 ">
                <div className="flex flex-col gap-3">
                    <div>
                        <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-bold">
                            선택된 가게
                        </span>
                        <h3 className="text-xl font-black mt-1">{place.place_name}</h3>
                        <p className="text-sm text-slate-500">{place.road_address_name}</p>
                    </div>

                    {/* //*반려당한 당사자(선택매장, 그 매장을 선택한 사장)라면 뜰 반려사유 */}
                    {checkResult?.isRejectedByMe && (
                        <div className="bg-red-50 rounded-2xl p-4 border border-red-100">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-red-600">
                                    <AlertCircle size={16} />
                                    <span className="text-xs font-bold">이전에 반려된 기록이 있습니다</span>
                                </div>
                                <button
                                    onClick={() => setShowRejectReason(!showRejectReason)}
                                    className="text-[11px] font-bold text-red-500 underline underline-offset-2 flex items-center gap-1"
                                >
                                    사유 {showRejectReason ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                </button>
                            </div>

                            {showRejectReason && (
                                <div className="mt-3 pt-3 border-t border-red-200/50">
                                    <p className="text-xs text-red-700 leading-relaxed whitespace-pre-wrap">
                                        {checkResult.rejectReason}
                                    </p>
                                    <p className="text-[10px] text-red-400 mt-2">
                                        * 사유를 보완하여 다시 신청해주시면 빠르게 심사해드릴게요!
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    <button
                        onClick={onNext}
                        disabled={isDisabled}
                        className={`
                            w-full py-4 rounded-2xl font-black text-lg transition-all
                            ${isDisabled
                                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                : "bg-orange-500 text-white shadow-orange-200 shadow-lg active:scale-95 cursor-pointer"
                            }
                        `}
                    >
                        {getButtonContent()}
                    </button>


                    {(checkResult?.exists || checkResult?.isPending) && (
                        // TODO 고객센터 문의를 내 메일로 할지 아니면 관리자 페이지에 전체로 쏴줄지 보기(이 말은 관리자로 등록된 사람은 다보이게 표시-공지사항처럼)
                        <p className="text-[11px] text-slate-400 text-center font-medium">
                            본인의 매장인데 등록이 안 된다면 고객센터로 문의해주세요.
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
})
