'use client'

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
import { addDays, endOfMonth, format, subDays } from 'date-fns'
import { calCulateTopRecord } from '@/entities/owner/lib/calCulateTopRecord'
import { useGetMonths } from '@/entities/owner/model/useGetMonths'
import { useGetMonthlySalesData } from '@/entities/owner/model/useGetMonthlySalesData'
import { useGetDailyChart } from '@/entities/owner/model/useGetDailyChart'
import { useGetAiInsight } from '@/features/owner/stats/model/useGetAiInsight'
import { useOwnerStoreStatus } from '@/entities/owner/model/useOwnerStoreStatus'


export default function StatsPage() {
    const now = new Date()
    const thisMonth = format(now, 'yyyy-MM')

    // *리포트보기
    const [openSummary, setOpenSummary] = useState(false)
    const [selectedMonth, setSelectedMonth] = useState<string>(thisMonth)
    // *차트 컴포넌트 월별, 일별 탭
    const [tab, setTab] = useState<'daily' | 'monthly'>('daily')
    const [viewEndDate, setViewEndDate] = useState(now)


    const { data: shopInfo } = useGetShopInfo()
    const shopId = shopInfo?.id
    // * 매장 승인 상태 
    const isVerified = useOwnerStoreStatus(state => state.isVerified)

    //*일별을 위함임
    const startDateStr = format(subDays(viewEndDate, 6), 'yyyy-MM-dd')
    const endDateStr = format(viewEndDate, 'yyyy-MM-dd')

    // * 선택된 달의 데이터만 나오게 되어있음 - 이건 리포트용임
    const { data: dailySalesData = []} = useGetDailySalesData(shopId, selectedMonth)
    // * 월별 데이터(연별로 그래프 볼때)
    const { data: monthlySalesData = [] } = useGetMonthlySalesData(shopId)
    // *일별 데이터(일별 그래프 용)
    const { data: dailyChartData = [], isPending: isDailyCharPending } = useGetDailyChart(shopId, startDateStr, endDateStr)



    // *선택달 전일 대비 데이터 - 리프트용
    const { data: diffData } = useGetStatsData(shopId, selectedMonth)
    //* 가입후부터의 월만 가져오기 - 헤더의 옵션용
    const { data: months = [] } = useGetMonths(shopId)

    // *월별 최고 매출, 방문, 객단가
    const topDays = useMemo(() => calCulateTopRecord(dailySalesData), [dailySalesData])

    const dataReadyForAi = !!diffData && topDays.length > 0 && !!shopId

    // *ai insight가져오기 - 제미나이
    const { data: aiInsight, isPending: aiPending } = useGetAiInsight({
        total_sales: diffData?.total_sales ?? 0, //이번달 총매출
        prev_sales: diffData?.prev_sales ?? 0, // 전 매출
        total_visits: diffData?.total_visits ?? 0, // 이번달 방문수
        prev_visits: diffData?.prev_visits ?? 0, // 지난달 방문수
        avg_visits: diffData?.avg_visits ?? 0, // 이번달 일 평균 방문수
        top_day: topDays[0]?.value || '데이터 없음', //최고 매출일
        top_visits: topDays[1]?.value || '데이터 없음', //최다 방문일
        avg_per_price: topDays[2]?.value || '데이터 없음', //겍딘가
        shop_id: shopId
    },
        dataReadyForAi)

    // * 실적통계 카드에서 현재 달이 클릭되어있으면 차트그래프는 일별차트로 보이고 과거달 데이터면 월별 탭으로 바뀌고 월별합산으로 보임
    const handlePeriodClick = (newMonth: string) => {
        setSelectedMonth(newMonth)
        if (newMonth === thisMonth) {
            setTab('daily')
            setViewEndDate(now)
        } else {
            setTab('monthly')
            const lastDayOfSelectedMonth = endOfMonth(new Date(newMonth))
            setViewEndDate(lastDayOfSelectedMonth)
        }
    }



    const handlePrev = () => setViewEndDate(prev => subDays(prev, 7))
    const handleNext = () => setViewEndDate(prev => {
        const next = addDays(prev, 7)
        return next > now ? now : next
    })

    const isNextDisabled = useMemo(() => {
        return format(viewEndDate, 'yyyy-MM-dd') >= format(new Date(), 'yyyy-MM-dd')
    }, [viewEndDate])


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




    const handleToggleSummary = () => {
        setOpenSummary((prev) => !prev)
    }


    return (
        <main className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="mx-auto flex max-w-7xl flex-col gap-6">
                <StatsHeaderCard
                    toggle={handleToggleSummary}
                    openSummary={openSummary}
                    months={months}
                    selectedMonth={selectedMonth}
                    setSelectedMonth={handlePeriodClick}
                    isVerified={isVerified}
                />

                {openSummary && <SummaryCard summaryCards={summaryCards} selectedMonth={selectedMonth} topDays={topDays} />}

                <DailyChart
                    isVerified={isVerified}
                    dailyData={dailyChartData}
                    monthlyData={monthlySalesData}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    isPending={isDailyCharPending}
                    tab={tab}
                    setTab={setTab}
                    dateRange={
                        tab === 'daily' ? `${format(subDays(viewEndDate, 6), 'MM.dd')} ~ ${format(viewEndDate, 'MM.dd')}`
                            : `${selectedMonth.split('-')[0]}년`
                    }
                    isNextDisabled={isNextDisabled}
                />

                <InsightCard content={aiInsight} isPending={aiPending} isVerified={isVerified}/>
            </div>
        </main>
    )
}