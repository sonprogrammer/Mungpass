'use client'

import { VactationFromDB } from "@/features/owner/my-store/model";
import { Popconfirm } from "antd";
import { format } from "date-fns";
import { Plane, XCircle } from "lucide-react";


export function StoreVacationStatus({vacation, onDelete}: {vacation:VactationFromDB,onDelete: () => void}) {
    return (
        <section className="animate-in slide-in-from-bottom-2 duration-500">
            <div className="flex items-center justify-between mb-3">
                <div className="flex gap-2">
                    <Plane size={14} className="text-blue-500" />
                    <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider">휴가 등록 현황</h3>
                </div>
                <p className="text-[12px] text-slate-700 underline">수정을 원하시면 휴가 버튼을 눌러 수정해주세요</p>
            </div>

            <div className="bg-white rounded-2xl border-2 border-blue-50 p-4 shadow-sm relative overflow-hidden">

                <Plane size={40} className="absolute -right-4 -bottom-2 text-blue-50 opacity-50 -rotate-12" />

                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Period</span>
                            <span className="text-base font-black text-slate-800">
                                {format(new Date(vacation.start_date!), 'yyyy.MM.dd')} — {format(new Date(vacation.end_date!), 'yyyy.MM.dd')}
                            </span>
                        </div>
                        

                        <Popconfirm
                            title="휴가 일정을 취소하시겠습니까?"
                            description="취소 즉시 정상 영업 상태로 복귀합니다."
                            onConfirm={onDelete}
                            okText="삭제"
                            cancelText="닫기"
                            okButtonProps={{ danger: true, size: 'small' }}
                            cancelButtonProps={{ size: 'small' }}
                        >
                            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 text-[11px] font-bold cursor-pointer">
                                <XCircle size={14} />
                                일정 취소
                            </button>
                        </Popconfirm>
                    </div>

                    <div className="h-px bg-slate-100 my-1" />

                    <div className="flex  justify-between gap-1">
                        <span className="text-[11px] font-bold text-slate-400">휴가 사유</span>
                        <p className="text-xs font-bold text-slate-600 leading-relaxed">
                            {vacation.reason || '입력된 사유가 없습니다.'}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}