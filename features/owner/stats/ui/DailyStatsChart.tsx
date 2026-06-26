'use client'


import { DailyStatsChartProps } from "@/features/owner/stats/model"
import { CustomTooltip } from "@/features/owner/stats/ui"
import { format } from "date-fns"
import { memo, useMemo } from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

function DailyStatsChartInner({ dailyData, handleNext, handlePrev, isNextDisabled, allMonthlyData }: DailyStatsChartProps) {

    const topRecordDate = useMemo(() => {
        if (!allMonthlyData || allMonthlyData.length === 0) return { date: '-', month: '-' };
        if (!allMonthlyData.some(d => d.sales > 0)) return { date: '-', month: '-' };

        const top = allMonthlyData.reduce((prev, cur) => prev.sales > cur.sales ? prev : cur)

        return {
            date: format(new Date(top.date), 'MM.dd'),
            month: format(new Date(top.date), 'MM')

        }

    }, [allMonthlyData])

    return (
        <div >
            <div className="w-full h-64">
                <ResponsiveContainer width="100%" height='100%'>
                    <BarChart data={dailyData} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="5 3" vertical={false} stroke="#e5e7" />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fontWeight: 600, fill: '#6b7280' }}
                            dy={10}
                            tickFormatter={(tick) => format(new Date(tick), 'MM.dd')}
                        />
                        <YAxis
                            dataKey="sales"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fontWeight: 600, fill: '#6b7280' }}
                            tickFormatter={(p) => `${p / 10000}만원`}
                        />
                        <Tooltip content={<CustomTooltip tab='daily' />} cursor={{ fill: '#f97316', opacity: 0.05 }} />
                        <Bar dataKey="sales" fill="#f97316" radius={[6, 6, 0, 0]} barSize={20} animationDuration={1500}>

                        </Bar>
                    </BarChart>

                </ResponsiveContainer>
            </div>

            <div className="flex gap-2 justify-end mt-2">
                <button onClick={handlePrev} className="cursor-pointer flex items-center justify-center px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-50">이전</button>
                <button onClick={handleNext} disabled={isNextDisabled} className={`flex items-center justify-center px-3 py-1 text-xs rounded-full border ${isNextDisabled ? 'bg-gray-50 text-gray-300 border-gray-100' : 'bg-white text-gray-600 border-gray-200 cursor-pointer'}`}>다음</button>
            </div>

            <div className="mt-6 flex justify-between items-center bg-gray-50 rounded-2xl p-4">
                <p className="text-[12px] font-medium text-gray-500">
                    {topRecordDate.month !== '-' ? `${topRecordDate.month}월 ` : ''}
                    가장 매출이 높았던 날
                </p>
                <p className="text-[14px] font-bold text-gray-900">{topRecordDate.date}</p>
            </div>
        </div>
    )

}

export const DailyStatsChart = memo(DailyStatsChartInner)