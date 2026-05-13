'use client'

import { RegisteredStoreInfoProps } from "@/entities/owner/my-shop/model/types";
import { ChevronRight, FileText } from "lucide-react";
import { memo } from "react";




export const RegisteredStoreInfo = memo(({ storeName, status, todaySales, accSales, onDetailClick, isLoading }: RegisteredStoreInfoProps) => {
    return (
        <section className='bg-emerald-500 px-6 pt-12 pb-10 rounded-b-[3.5rem] shadow-lg relative overflow-hidden'>

            <div className="flex justify-between">
                <div className="flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-white text-3xl font-black tracking-tight">{storeName}</h1>
                            <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-white text-[10px] font-bold text-emerald-600">
                                {status}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={onDetailClick}
                        className="group cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-emerald-400/50 hover:bg-emerald-400/70 rounded-full transition-colors self-start mt-8"
                    >
                        <FileText size={18} strokeWidth={2.5} className="text-white" />
                        <span className="text-[12px] font-bold text-white">상세 서류 및 내역 확인</span>
                        <ChevronRight size={14} className="text-emerald-100 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                </div>

                {/* //* 매출 통계 섹션 */}
                <div className="flex flex-col gap-1">

                    <div className="flex flex-col text-right">
                        <p className="text-emerald-100 text-xs font-bold tracking-wider">오늘의 매출</p>
                        <div className="flex items-center gap-1 justify-end text-white">
                            {isLoading ? (
                                <div className="h-5 w-16 bg-emerald-400/50 animate-pulse rounded-md" />
                            ) : (
                                <>
                                    <span className="text-lg font-extrabold">
                                        {(todaySales ?? 0).toLocaleString()}
                                    </span>
                                    <span className="text-xs opacity-80">원</span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* //*월 누적 데이터*/}
                    <div className="text-right">
                        <p className="text-emerald-100 text-xs font-bold tracking-wider">이번 달 누적</p>
                        <div className="flex items-center gap-1 justify-end text-white">
                            {isLoading ? (
                                <div className="h-5 w-20 bg-emerald-400/50 animate-pulse rounded-md" />
                            ) : (
                                <>
                                    <span className="text-lg font-extrabold">
                                        {(accSales ?? 0).toLocaleString()}
                                    </span>
                                    <span className="text-xs opacity-80">원</span>
                                </>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
})

RegisteredStoreInfo.displayName = 'RegisteredStoreInfo'