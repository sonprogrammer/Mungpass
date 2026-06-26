'use client'

import { HighestRecords } from '@/features/owner/stats/ui'
import { ArrowUpRight, ArrowDownRight, CircleDollarSign, QrCode, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { SummaryCardProps } from '@/features/owner/stats/model'
import { format } from 'date-fns'
import { useMemo } from 'react'
import { calculateChange } from '@/entities/owner/lib'

const CardSkeleton = () => (
    <div className="group relative overflow-hidden rounded-4xl border border-gray-100 bg-white p-6 shadow-sm h-44.5 animate-pulse">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
                <div className="rounded-xl bg-gray-200 p-5" />
                <div className="h-4 w-20 bg-gray-200 rounded" />
            </div>
        </div>
        <div className="mt-4 h-8 w-32 bg-gray-200 rounded" />
        <div className="mt-4 h-6 w-24 bg-gray-200 rounded" />
    </div>
)

export function SummaryCard({ topDays, selectedMonth, diffData, isPending }: SummaryCardProps) {

    const summaryCards = useMemo(() => {
        if (!diffData) return []

        return [
            {
                id: 1,
                title: ' 총 매출',
                value: `${(diffData.total_sales || 0).toLocaleString()}원`,
                change: calculateChange(diffData.total_sales, diffData.prev_sales),
                icon: CircleDollarSign,
            },
            {
                id: 2,
                title: ' 총 체크인',
                value: `${diffData.total_visits}건`,
                change: calculateChange(diffData.total_visits, diffData.prev_visits),
                icon: QrCode,
            },
            {
                id: 3,
                title: '일 평균 방문',
                value: `${diffData.avg_visits.toFixed(2)}마리`,
                change: calculateChange(diffData.avg_visits, diffData.prev_avg_visits),
                icon: TrendingUp,
            },
        ];
    }, [diffData])


    const thisMonth = format(new Date(), 'yyyy-MM')

    return (
        <section className="grid grid-cols-2 gap-4 ">
            {isPending ? (
                <>
                    {[1, 2, 3].map((id) => <CardSkeleton key={id} />)}
                    <div className="rounded-4xl border border-gray-100 p-6 shadow-sm h-44.5 animate-pulse bg-gray-50" />
                </>
            ) : (
                <>
                    {summaryCards?.map((card) => {
                        const Icon = card.icon
                        const isPositive = card.change.includes('+')
                        const month = selectedMonth.split('-')[1]

                        return (
                            <motion.article
                                initial={{opacity: 0, y: 10}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.3, delay: card.id * 0.1}}
                                key={card.id}
                                className="group relative overflow-hidden rounded-4xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <div className="rounded-xl bg-orange-50 p-2 text-orange-500 transition-colors group-hover:bg-orange-100">
                                            <Icon size={18} strokeWidth={2.5} />
                                        </div>
                                        <p className="text-[13px] font-semibold text-gray-500">
                                            {(selectedMonth === thisMonth ? '이번 달 ' : `${month}월 `) + card.title}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 flex items-baseline gap-1">
                                    <p className="text-2xl font-black tracking-tight text-gray-900">
                                        {card.value}
                                    </p>
                                </div>

                                <div className="mt-4 flex items-center gap-1.5">
                                    <div className={`flex items-center rounded-lg px-2 py-0.5 text-[11px] font-bold 
                                    ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}
                                        `}>
                                        {isPositive ? <ArrowUpRight size={12} className="mr-0.5" /> : <ArrowDownRight size={12} className="mr-0.5" />}
                                        {card.change}
                                    </div>
                                    <span className="text-[11px] font-medium text-gray-400">지난달 대비</span>
                                </div>
                                
                                <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-orange-50/30 blur-2xl transition-all group-hover:bg-orange-100/50" />
                            </motion.article>
                        )
                    })}
                    <motion.div
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.3, delay: 0.4}}
                    >
                        <HighestRecords topDays={topDays} />
                    </motion.div>
                </>
            )}
        </section>
    )
}