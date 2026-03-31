'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'
import { useMemo, useState } from 'react';
import { subDays, format, eachMonthOfInterval, startOfYear } from 'date-fns';
import { Segmented } from 'antd';
import { BarChart3, Calendar } from 'lucide-react';

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { payload: { date: string, sales: number, visits: number } }[] }) => {

    if (active && payload && payload.length) {

        const data = payload[0]

        return (
            <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-xl">
                <p className="text-[10px] font-bold text-gray-400 mb-1">
                    {data.payload?.date}
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


export function DailyChart({ chartData }: { chartData: { date: string,  sales: number, visits: number }[] }) {
    const[tab, setTab] = useState<'daily' | 'monthly'>('daily')
    const [defaultDate, setDefaultDate] = useState(new Date())


    const filteredData = useMemo(() => {
        // * 일별 차트데이터
        if(tab ==='daily'){

            
            const days = []
            
            for (let i = 6; i >= 0; i--) {
                const date = subDays(defaultDate, i);
                const dateStr = format(date, 'yyyy-MM-dd');
                
                const existingData = chartData.find(d => d.date === dateStr)
                
                days.push(existingData || { date: dateStr, stats: { sales: 0, visits: 0 } })
            }
            return days
        }else{
            // * 월별 차트 데이터
            const months = eachMonthOfInterval({
                start: startOfYear(defaultDate),
                end: new Date()
            })
            return months.map(month => {
                const monthStr = format(month, 'yyyy-MM')
                const monthlyStats = chartData.filter(data => data.date.startsWith(monthStr))
                .reduce((acc, cur) => ({
                    sales: acc.sales + cur.sales,
                    visits: acc.visits + cur.visits
                }),{sales:0, visits:0})
                return{
                    date: monthStr,
                    ...monthlyStats
                }
            })
        }
    }, [defaultDate, chartData, tab])

    const handlePrevWeek = () => {
        setDefaultDate(prev => tab=== 'daily' ? subDays(prev, 7) : subDays(prev, 365))
    }

    const handleNextWeek = () => {
        setDefaultDate(prev => tab=== 'daily' ? subDays(prev, 7) : subDays(prev, 365))
    }

    const dateRange = tab === 'daily' ?
    `${format(subDays(defaultDate, 6), 'MM.dd')} ~ ${format(defaultDate, 'MM.dd')}`
    : `${format(defaultDate, 'yyyy')}년`
const SEGMENT_OPTIONS = [
    {label:'일별', value:'daily', icon: <Calendar size={14} />},
    {label:'월별', value:'monthly', icon: <BarChart3 size={14} />}
];
console.log('rendering check')
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
                        <h2 className="text-lg font-bold text-gray-900">일별 매출 추이</h2>
                        <p className="mt-1 text-sm text-gray-500 font-medium">
                            {dateRange} 매출 현황
                        </p>
                        <p>hfads</p>
                    <button>gk</button>
                    </div>
                    
                    {/* <Segmented 
                        options={[
                            {label:'일별', value:'daily', icon: <Calendar size={14} className={tab === 'daily' ? 'text-orange-500': ''}/>},
                            {label:'월별', value:'monthly', icon: <BarChart3 size={14} className={tab === 'daily' ? 'text-orange-500': ''}/>}
                        ]}
                        value={tab}
                        // onChange={(t) => setTab(t)}
                        className='bg-gray-100'
                    /> */}
                </div>

                <div className="w-full h-64 mt-5">
                    <ResponsiveContainer width="100%" height='100%'>
                        <BarChart data={filteredData} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="5 3" vertical={false} stroke="#e5e7" />
                            <XAxis
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 11, fontWeight: 600, fill: '#6b7280' }}
                                dy={10}
                                tickFormatter={(str) => {
                                    const date = new Date(str)
                                    return format(date, 'MM-dd')
                                }}
                            />
                            <YAxis
                                dataKey="sales"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 11, fontWeight: 600, fill: '#6b7280' }}
                                tickFormatter={(p) => `${p / 10000}만원`}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="sales" fill="#f97316" radius={[6, 6, 0, 0]} barSize={20} animationDuration={1500}>

                            </Bar>
                        </BarChart>

                    </ResponsiveContainer>

                </div>

                <div className="flex gap-2">
                    <button
                        onClick={handlePrevWeek}
                        className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                        이전
                    </button>
                    <button
                        onClick={handleNextWeek}
                        className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                        다음56ㅇㄴㄴ
                    </button>
                </div>

                <div className="mt-6 flex justify-between items-center bg-gray-50 rounded-2xl p-4">
                    <p className="text-[12px] font-medium text-gray-500">가장 매출이 높았던 날</p>
                    <p className="text-[12px] font-bold text-gray-900">
                        {chartData && chartData.length > 0
                            ? chartData.reduce((prev, curr) => prev.sales > curr.sales ? prev : curr).date
                            : "데이터 없음"
                        }
                    </p>
                </div>


            </article>


        </motion.section>
    )
}