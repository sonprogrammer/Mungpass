'use client'

import { StatsHeaderCardProps } from "@/features/owner/stats/model/types"
import { Button, Select } from "antd"
import { BarChart3, CalendarDays } from "lucide-react"

export function StatsHeaderCard({ toggle, openSummary, months, selectedMonth, setSelectedMonth }:StatsHeaderCardProps) {

    const options = months.map(m => {
        const [year, month] = m.split('-')
        return { value: m, label: `${year}년 ${month}월` }
    })
    
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
                    <Select 
                        value={selectedMonth}
                        onChange={setSelectedMonth}
                        options={options}
                        prefix={<CalendarDays size={16} className="text-blue-500"/>}
                        variant="filled"
                    />

                    <Button 
                            type={openSummary ? "default" : "primary"}
                            size="large"
                            onClick={toggle}
                            className={openSummary ? "border-gray-200" : "bg-emerald-500! hover:bg-emerald-600!"}
                            style={{ borderRadius: '12px', fontWeight: 500 }}
                        >
                        {openSummary ? '리포트 숨기기' : '리포트 보기'}
                    </Button>
                </div>
            </div>
        </section>
    )
}