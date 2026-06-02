'use client'

import { motion } from 'framer-motion'
import { Segmented } from 'antd';
import { BarChart3, Calendar } from 'lucide-react';
import { useMemo, useState } from 'react';
import { addDays, addYears, format, subDays, subYears } from 'date-fns';
import { DailyChartProps } from '@/features/owner/stats/model';
import { useGetDailyChart } from '@/entities/owner/model';
import { DailyStatsChart, MonthlyStatsChart } from '@/features/owner/stats/ui';



export function DailyChart({ tab, setTab, isVerified, shopId }: DailyChartProps) {


    const now = useMemo(() => new Date(), [])
    const [viewEndDate, setViewEndDate] = useState(now)
    const [currentYearDate, setCurrentYearDate] = useState(now)
    const currentYearStr = format(currentYearDate, 'yyyy')


    const startDateStr = format(subDays(viewEndDate, 6), 'yyyy-MM-dd')
    const endDateStr = format(viewEndDate, 'yyyy-MM-dd')

    // *일별 데이터(일별 그래프 용)
    const { data: dailyData = [], isPending: isDailyChartPending } = useGetDailyChart(shopId, startDateStr, endDateStr)

    const handlePrev = () => setViewEndDate(prev => subDays(prev, 7))
    const handleNext = () => setViewEndDate(prev => {
        const next = addDays(prev, 7)
        return next > now ? now : next
    })

    const isNextDisabled = useMemo(() => {
        return format(viewEndDate, 'yyyy-MM-dd') >= format(now, 'yyyy-MM-dd')
    }, [viewEndDate, now])

    const handlePrevYear = () => setCurrentYearDate(prev => subYears(prev, 1))
    const handleNextYear = () => setCurrentYearDate(prev => {
        const next = addYears(prev, 1)
        return next > now ? now : next
    })

    const isNextDisabledYear = useMemo(() => {
        return format(currentYearDate, 'yyyy') >= format(now, 'yyyy')
    }, [currentYearDate, now])



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
                            {tab === 'daily' ? `${format(subDays(viewEndDate, 6), 'MM.dd')} ~ ${format(viewEndDate,'MM.dd')}`
                                            : `${currentYearStr}년`
                            } 
                            매출 현황
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

                <div className={`w-full mt-5 transition-opacity ${isDailyChartPending ? 'opacity-50' : 'opacity-100'}`}>

                    {!isVerified && (
                        <div className="w-full h-full flex flex-col items-center justify-center rounded-xl bg-white/30 backdrop-blur-lg border border-dashed border-gray-200">
                            <div className="bg-white/80 px-4 py-2 rounded-full shadow-sm border border-gray-100">
                                <p className="text-[12px] font-bold text-gray-600 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                                    심사 승인 후 매출 차트가 활성화됩니다
                                </p>
                            </div>
                        </div>
                    )}

                    {/* 차트 */}
                    {tab === 'daily' ? (
                        <DailyStatsChart
                            dailyData={dailyData}
                            handleNext={handleNext}
                            handlePrev={handlePrev}
                            isNextDisabled={isNextDisabled}
                        />
                    ) : (
                        <MonthlyStatsChart
                            shopId={shopId}
                            handleNextYear={handleNextYear}
                            handlePrevYear={handlePrevYear}
                            isNextDisabledYear={isNextDisabledYear}
                            now={now}
                            currentYearStr={currentYearStr}
                        />
                    )}


                </div>



            </article>


        </motion.section>
    )
}