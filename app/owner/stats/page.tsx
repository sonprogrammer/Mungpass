'use client'
{/* TODO 여기는 멍패스로 큐알 한 일별 매출 통계 그래프로 하면됨 몇마리 인지하고  */}

import { SummaryCard } from '@/features/owner/stats/ui/SummarCards'
import { StatsHeaderCard } from '@/features/owner/stats/ui/StatsHeaderCard'
import { CircleDollarSign, Dog, QrCode, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { DailyChart } from '@/features/owner/stats/ui/DailyChart'
import { InsightCard } from '@/features/owner/stats/ui/InsitghtCard'

export default function StatsPage() {
    const [openSummary, setOpenSummary] = useState(false)
    
    // 목업
    const summaryCards = [
        {
            id: 1,
            title: '이번 달 총 매출',
            value: '₩2,480,000',
            change: '+12.4%',
            icon: CircleDollarSign,
        },
        {
            id: 2,
            title: '이번 달 총 체크인',
            value: '186건',
            change: '+8.1%',
            icon: QrCode,
        },
        {
            id: 3,
            title: '일 평균 방문',
            value: '6.2마리',
            change: '+4.3%',
            icon: TrendingUp,
        },
    ]
    // 목업
    const chartData = [
    { day: '2026-03-10', sales: 120000, visits: 5 },
    { day: '2026-03-11', sales: 180000, visits: 7 },
    { day: '2026-03-12', sales: 100000, visits: 4 },
    { day: '2026-03-13', sales: 240000, visits: 9 },
    { day: '2026-03-14', sales: 200000, visits: 8 },
    { day: '2026-03-15', sales: 140000, visits: 5 },
    { day: '2026-03-16', sales: 280000, visits: 10 },
    { day: '2026-03-17', sales: 120000, visits: 5 },
    { day: '2026-03-18', sales: 180000, visits: 7 },
    { day: '2026-03-19', sales: 100000, visits: 4 },
    { day: '2026-03-20', sales: 240000, visits: 9 },
    { day: '2026-03-21', sales: 200000, visits: 8 },
    { day: '2026-03-22', sales: 140000, visits: 5 },
    { day: '2026-03-23', sales: 280000, visits: 10 },
];
    // 목업
    const maxSales = Math.max(...chartData.map((item) => item.sales))
    // 목업
    const topDays = [
        { id: 1, label: '최고 매출일', value: '03.23', subValue: '₩420,000' },
        { id: 2, label: '최다 방문일', value: '03.23', subValue: '10마리' },
        { id: 3, label: '평균 객단가', value: '₩13,300', subValue: '체크인 1건 기준' },
    ]

    const handleToggleSummary = () => {
        setOpenSummary((prev) => !prev)
    }

    return (
        <main className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="mx-auto flex max-w-7xl flex-col gap-6">
                <StatsHeaderCard toggle={handleToggleSummary} open={openSummary} />

                {openSummary && <SummaryCard summaryCards={summaryCards} topDays={topDays}/>}

                <DailyChart chartData={chartData} />

                <InsightCard title="Insight" 
                    value="주말 체크인 수가 평일보다 확실히 높고, 금요일 이후 매출 상승폭이 크게 나타나고 있어요." 
                    change="+12.4%" 
                />
            </div>
        </main>
    )
}