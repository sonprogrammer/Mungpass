'use client'

import { Info, Lock, Sparkles, TrendingUp } from "lucide-react";

// TODO 일단은 일별 한번만 ai인사이트 요청 가능하고 멍패스 인사이트 가입시 무제한으로 되게(이건 나중에 규모 커지면) - 서버로직은 짜놈

export function InsightCard({ content, isPending, isVerified, isDataReady, onReq, isAiReq }: { content: string, isPending: boolean, isVerified: boolean, isDataReady: boolean, onReq: () => void, isAiReq: boolean }) {
    return (
        <section className="mt-6">
            <article className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm overflow-hidden relative">

                <div className="flex items-start justify-between gap-3 relative">
                    <div>
                        <div className="flex gap-2">
                            <h2 className="text-lg font-black text-gray-900 leading-tight">멍패스 AI 리포트</h2>
                            <span className="inline-flex items-center rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-bold text-orange-600">
                                일일 1회
                            </span>
                        </div>
                    </div>
                    <TrendingUp size={20} className="text-orange-500" />
                </div>

                <div className="mt-5 rounded-2xl bg-gray-50 p-5 text-sm leading-7 text-gray-600 min-h-30 relative">
                    {!isVerified ? (
                                <div className="flex flex-col items-center justify-center py-4 text-center">
                                    <p className="font-semibold text-gray-700 text-lg">매장 심사 승인 후 받아보실 수 있습니다</p>
                                    <p className="mt-1 text-gray-500 text-[13px]">
                                        지점 등록 및 서류 인증이 완료되면 <br />
                                        AI가 사장님 매장만을 위한 운영 리포트를 작성해드려요.
                                    </p>
                                </div>
                    ) : !isAiReq ? (
                        <div className="flex flex-col items-center justify-center py-5 text-center">
                            <div className="mb-3 rounded-2xl bg-orange-100 p-3 text-orange-500">
                                <Sparkles size={24} />
                            </div>
                            <p className="text-base font-bold text-gray-800">
                                AI가 매장 운영 데이터를 분석해 드려요
                            </p>
                            <p className="mt-1 text-[13px] text-gray-500">
                                매출과 방문 데이터를 기반으로 맞춤형 인사이트를 확인해 보세요.
                            </p>
                            <button
                                type="button"
                                onClick={onReq}
                                className="mt-5 flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 font-bold text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-300 cursor-pointer"
                            >
                                <Sparkles size={16} />
                                AI 리포트 분석하기
                            </button>
                        </div>
                    ):
                    isPending ? (
                        <div className="flex flex-col gap-3 animate-pulse">
                            <div className="h-4 w-[90%] rounded-full bg-linear-to-r from-gray-200 to-gray-100"></div>
                            <div className="h-4 w-full rounded-full bg-linear-to-r from-gray-200 to-gray-100"></div>
                            <div className="h-4 w-[70%] rounded-full bg-linear-to-r from-gray-200 to-gray-100"></div>

                            <div className="mt-2 flex items-center gap-2 text-[12px] text-orange-400 font-medium">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                                </span>
                                데이터 분석 중...
                            </div>
                        </div>
                    ) : (
                         content ? content : "분석할 수 있는 통계 데이터가 부족합니다. 매장 이용 건수가 쌓이면 리포트가 생성됩니다."
                    )}
                </div>

                {/* TODO 나중에 비즈니스 할때 유료회원도 결제 가능하게 하기 */}
                <div className="mt-4 flex items-center gap-1.5 px-1 text-[11px] text-gray-400">
                    <Info size={13} />
                    <span>무료 회원은 매일 1회 분석 리포트가 생성됩니다.</span>
                    {/* <button className="ml-auto font-bold text-orange-500 hover:underline flex items-center gap-0.5"> */}
                        {/* <Lock size={10} /> */}
                        {/* 실시간 분석 무제한 이용하기 */}
                        {/* 서비스 개발 중입니다. */}
                    {/* </button> */}
                </div>

            </article>
        </section>
    )
}