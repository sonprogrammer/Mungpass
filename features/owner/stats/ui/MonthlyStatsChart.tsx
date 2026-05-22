'use client'

import { useGetMonthlySalesData } from "@/entities/owner/model/useGetMonthlySalesData"
import { CustomTooltip } from "@/features/owner/stats/ui/CustomTooltip"
import { format } from "date-fns"
import { memo, useMemo} from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface MonthlyStatsChartProps {
    shopId: string
    handleNextYear: () => void
    handlePrevYear: () => void
    isNextDisabledYear: boolean
    currentYearStr: string
    now: Date
}

function MonthlyStatsChart({ shopId, handleNextYear, handlePrevYear, isNextDisabledYear, currentYearStr, now }: MonthlyStatsChartProps) {
    

    
    // * 월별 데이터(연별로 그래프 볼때)
    const { data: monthlySalesData = [] } = useGetMonthlySalesData(shopId)
    console.log('month', monthlySalesData)

    const chartData = useMemo(() => {
        if (!monthlySalesData) return []
        return [...monthlySalesData].filter(item => item.month.startsWith(currentYearStr)).sort((a, b) => a.month.localeCompare(b.month)).map(item => ({
            ...item,
            date: item.month
        }))
    }, [monthlySalesData, currentYearStr])

    
    


    const topRecordDate = useMemo(() => {
        if (!chartData || chartData.length === 0) return '데이터 없음'
        if (!chartData.some(c => c.sales > 0)) return '-'
        
        const top = chartData.reduce((prev, cur) => prev.sales > cur.sales ? prev : cur)
        const month = top.date.split('-')[1]

        return `${Number(month)}월`

    }, [chartData])

    return (
        <>
            <div className="w-full h-64">
                <ResponsiveContainer width="100%" height='100%'>
                    <BarChart data={chartData} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="5 3" vertical={false} stroke="#e5e7" />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fontWeight: 600, fill: '#6b7280' }}
                            dy={10}
                            tickFormatter={(tick) => `${format(tick, 'MM')}월`}
                        />
                        <YAxis
                            dataKey="sales"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fontWeight: 600, fill: '#6b7280' }}
                            tickFormatter={(p) => `${p / 10000}만원`}
                        />
                        <Tooltip content={<CustomTooltip tab='monthly' />} cursor={{ fill: '#f97316', opacity: 0.05 }} />
                        <Bar dataKey="sales" fill="#f97316" radius={[6, 6, 0, 0]} barSize={20} animationDuration={1500}>

                        </Bar>
                    </BarChart>

                </ResponsiveContainer>
            </div>

            <div className="flex gap-2 justify-end mt-2">
                <button onClick={handlePrevYear} 
                    className="cursor-pointer flex items-center justify-center px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-50">
                    이전 해
                </button>
                <button onClick={handleNextYear} disabled={isNextDisabledYear} 
                    className={`flex items-center justify-center px-3 py-1 text-xs rounded-full border ${isNextDisabledYear ? 'bg-gray-50 text-gray-300 border-gray-100' : 'bg-white text-gray-600 border-gray-200 cursor-pointer'}`}>
                        {currentYearStr === format(now, 'yyyy') ? '올해' : '다음 해'}
                </button>
            </div>

            <div className="mt-6 flex justify-between items-center bg-gray-50 rounded-2xl p-4">
                <p className="text-[12px] font-medium text-gray-500">{currentYearStr}년 최고 매출 달</p>
                <p className="text-[12px] font-bold text-gray-900">{topRecordDate}</p>
            </div>
        </>
    )

}

export default memo(MonthlyStatsChart)