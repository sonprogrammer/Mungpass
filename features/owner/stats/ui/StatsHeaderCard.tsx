'use client'

import { BarChart3, CalendarDays, ChevronDown } from "lucide-react"

export function StatsHeaderCard({toggle, open}: {toggle: ()=> void, open: boolean}) {
    return (
        <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 ">
                <div>
                    <div className="flex items-center gap-2 text-orange-500">
                        <BarChart3 size={18} />
                        <p className="text-sm font-medium">실적 통계</p>
                    </div>
                    {/* <h1 className="mt-2 text-xl font-bold text-gray-900">매장 이용 현황과 매출 흐름</h1> */}
                    <p className=" text-[12px] leading-6 text-gray-500">
                        체크인 수와 일별 매출 흐름을 한눈에 보고, 운영 추이를 빠르게 확인할 수 있어요.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                        <CalendarDays size={16} />
                        {/* //TODO 디비에 있는 월이 나와야함 */}
                        2026년 3월
                        <ChevronDown size={16} />
                    </button>

                    <button
                        type="button"
                        className="cursor-pointer rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
                        onClick={toggle}
                    >
                        {open ? '리포트 숨기기' : '리포트 보기'}
                    </button>
                </div>
            </div>
        </section>
    )
}