'use client'

import { HighestRecords } from '@/features/owner/stats/ui/HighestRecords'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { SummaryCardProps } from '@/features/owner/stats/model/types'
import { format } from 'date-fns'

export function SummaryCard({ summaryCards, topDays, selectedMonth }: SummaryCardProps) {
    const thisMonth = format(new Date(), 'yyyy-MM')

    return (
        <section className="grid grid-cols-2 gap-4 ">
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
        </section>
    )
}