'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'
import { useMemo } from 'react';
import { Segmented } from 'antd';
import { BarChart3, Calendar } from 'lucide-react';
import { DailyChartProps } from '@/features/owner/stats/model/types';
import { format } from 'date-fns';

const CustomTooltip = ({ active, payload, tab }: { active?: boolean; payload?: { payload: { date: string, sales: number, visits: number } }[]; tab: 'daily' | 'monthly' }) => {

    if (active && payload && payload.length) {

        const data = payload[0]
        const label = tab === 'daily' ? format(data.payload.date, 'MM.dd') : `${data.payload.date.split('-')[0]}년 ${data.payload.date.split('-')[1]}월`


        return (
            <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-xl">
                <p className="text-[10px] font-bold text-gray-400 mb-1">
                    {label}
                </p>
                <p className="text-sm font-black text-gray-900">
                    {data.payload?.sales?.toLocaleString()}원
                </p>
                <p className="text-[11px] font-medium text-orange-500">
                    {data.payload?.visits}건의 체크인
                </p>
            </div>
        );
    }
    return null;
};


export function DailyChart({ dailyData, monthlyData, tab, setTab, handleNext, handlePrev, isPending, dateRange, isNextDisabled }: DailyChartProps) {

    const chartData = useMemo(() => {
        if (tab === 'daily') return dailyData

        return monthlyData.map(item => ({
            ...item,
            date: item.month
        }))
    }, [tab, dailyData, monthlyData])

    console.log('chartData', chartData)


    const topRecordDate = useMemo(() => {
        if (!chartData || chartData.length === 0) return '데이터 없음'
        const hasAnySales = chartData.some(d => d.sales > 0)
        if (!hasAnySales) return '-'

        const top = chartData.reduce((prev, cur) => prev.sales > cur.sales ? prev : cur)

        if (tab === 'daily') {
            return format(new Date(top.date), 'MM.dd')
        } else {
            const month = top.date.split('-')[1]
            return `${Number(month)}월`
        }

    }, [chartData, tab])

    const renderQuarterTick = (tickItem: string) => {
        if (!tickItem) return ''
        return tab === 'daily'
            ? format(tickItem, 'MM.dd')
            : `${format(tickItem, 'MM')}월`
    }


    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid gap-6"
        >
            <article className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">
                            {`${tab === 'daily' ? '일별 ' : '연별 '}`}매출 추이
                        </h2>
                        <p className="mt-1 text-sm text-gray-500 font-medium">
                            {dateRange} 매출 현황
                        </p>
                    </div>

                    <Segmented
                        options={[
                            { label: '일별', value: 'daily', icon: <Calendar size={14} className={tab === 'daily' ? 'text-orange-500' : ''} /> },
                            { label: '월별', value: 'monthly', icon: <BarChart3 size={14} className={tab === 'monthly' ? 'text-orange-500' : ''} /> }
                        ]}
                        value={tab}
                        onChange={(t: 'daily' | 'monthly') => setTab(t)}
                        className='bg-gray-100'
                    />
                </div>

                <div className={`w-full h-64 mt-5 transition-opacity ${isPending ? 'opacity-50' : 'opacity-100'}`}>
                    <ResponsiveContainer width="100%" height='100%'>
                        <BarChart data={chartData} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="5 3" vertical={false} stroke="#e5e7" />
                            <XAxis
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 11, fontWeight: 600, fill: '#6b7280' }}
                                dy={10}
                                tickFormatter={renderQuarterTick}
                            />
                            <YAxis
                                dataKey="sales"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 11, fontWeight: 600, fill: '#6b7280' }}
                                tickFormatter={(p) => `${p / 10000}만원`}
                            />
                            <Tooltip content={<CustomTooltip tab={tab} />} cursor={{ fill: '#f97316', opacity: 0.05 }} />
                            <Bar dataKey="sales" fill="#f97316" radius={[6, 6, 0, 0]} barSize={20} animationDuration={1500}>

                            </Bar>
                        </BarChart>

                    </ResponsiveContainer>

                </div>

                <div className="flex gap-2 justify-end mt-2">
                    <button
                        onClick={handlePrev}
                        className="cursor-pointer flex items-center justify-center px-3 py-1 text-xs rounded-full bg-gray-100 shadow-sm border border-gray-200 text-gray-600 hover:bg-gray-50 active:scale-95 transition-all"
                        title='이전 7일'
                    >
                        이전
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={isNextDisabled}
                        className={`flex items-center justify-center px-3 py-1 text-xs rounded-full shadow-sm border transition-all
                                ${isNextDisabled
                                ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed'
                                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 active:scale-95 cursor-pointer'
                            }`}
                        title="다음 7일"
                    >
                        다음
                    </button>
                </div>

                <div className="mt-6 flex justify-between items-center bg-gray-50 rounded-2xl p-4">
                    <p className="text-[12px] font-medium text-gray-500">가장 매출이 높았던 날</p>
                    <p className="text-[12px] font-bold text-gray-900">
                        {topRecordDate}
                    </p>
                </div>


            </article>


        </motion.section>
    )
}