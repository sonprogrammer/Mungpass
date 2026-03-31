'use client'
{/* TODO 여기는 멍패스로 큐알 한 일별 매출 통계 그래프로 하면됨 몇마리 인지하고  */}

import { SummaryCard } from '@/features/owner/stats/ui/SummarCards'
import { StatsHeaderCard } from '@/features/owner/stats/ui/StatsHeaderCard'
import { CircleDollarSign, QrCode, TrendingUp } from 'lucide-react'
import { useMemo, useState } from 'react'
import { DailyChart } from '@/features/owner/stats/ui/DailyChart'
import { InsightCard } from '@/features/owner/stats/ui/InsitghtCard'
import { useGetDailySalesData } from '@/entities/owner/model/useGetDailySalesData'
import { useGetShopInfo } from '@/entities/owner/model/useGetShopInfo'
import { useGetStatsData } from '@/entities/owner/model/useGetStatsData'
import { calculateChange } from '@/entities/owner/lib/calculateChange'
import { format } from 'date-fns'
import { calCulateTopRecord } from '@/entities/owner/lib/calCulateTopRecord'


export default function StatsPage() {
    const [openSummary, setOpenSummary] = useState(false)

    const now = new Date()
    const thisMonth = format(now, 'yyyy-MM')
    console.log('this', thisMonth)
    const [selectedMonth, setSelectedMonth] = useState<string>(thisMonth)
    
    const { data: shopInfo } = useGetShopInfo()
    const shopId = shopInfo?.id
    // TODO 이거를 그냥 월별로 가져오게 하는게 낫겠다
    const { data: dailySalesData =[] } = useGetDailySalesData(shopId, selectedMonth)
    const { data: diffData} = useGetStatsData(shopId, selectedMonth)
    console.log('dailySalesData', dailySalesData)
    console.log('diffData', diffData)

    // *월별 보기
    const ViewMonthly = Array.from(
        new Set(dailySalesData.map(item => item.date.slice(0, 7)))
    ).sort().reverse()

    const currentMonth = selectedMonth || ViewMonthly[0]
    const filteredChartData = dailySalesData.filter(data => data.date.startsWith(currentMonth))

    
    const summaryCards = useMemo(() => {
        if (!diffData) return []

        return [
            {
                id: 1,
                title: '이번 달 총 매출',
                value: `${(diffData.total_sales || 0).toLocaleString()}원`,
                change: calculateChange(diffData.total_sales, diffData.prev_sales),
                icon: CircleDollarSign,
            },
            {
                id: 2,
                title: '이번 달 총 체크인',
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
    
    // *월별 최고 매출, 방문, 객단가
    const topDays = useMemo(() => calCulateTopRecord(dailySalesData),[dailySalesData])
    

    const handleToggleSummary = () => {
        setOpenSummary((prev) => !prev)
    }

    // TODO 로딩 상태 바꿔주기 다른 ui로 
    if (!dailySalesData) return <div>Loading...</div>
    if(!shopId) return <div>Loading...</div>

    return (
        <main className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="mx-auto flex max-w-7xl flex-col gap-6">
                <StatsHeaderCard 
                    toggle={handleToggleSummary} 
                    openSummary={openSummary} 
                    months={ViewMonthly}
                    selectedMonth={currentMonth}
                    setSelectedMonth={setSelectedMonth}
                />

                {openSummary && <SummaryCard summaryCards={summaryCards} topDays={topDays}/>}

                {/* <DailyChart chartData={dailySalesData} /> */}

                <InsightCard title="Insight" 
                    value="주말 체크인 수가 평일보다 확실히 높고, 금요일 이후 매출 상승폭이 크게 나타나고 있어요." 
                    change="+12.4%" 
                />
            </div>
        </main>
    )
}