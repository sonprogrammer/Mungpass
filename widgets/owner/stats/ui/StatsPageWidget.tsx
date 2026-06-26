'use client'

import { useMemo, useState } from 'react'
import { SummaryCard, DailyChart, InsightCard, StatsHeaderCard } from '@/features/owner/stats/ui'
import { useGetDailySalesData, useGetShopInfo, useGetStatsData, useOwnerStoreStatus } from '@/entities/owner/model'
import {  format } from 'date-fns'
import { calCulateTopRecord } from '@/entities/owner/lib'
import { useGetAiInsight } from '@/features/owner/stats/model'


export function StatsPageWidget() {
    const now = new Date()
    const thisMonth = format(now, 'yyyy-MM')

    // *리포트보기
    const [openSummary, setOpenSummary] = useState(false)
    const [selectedMonth, setSelectedMonth] = useState<string>(thisMonth)
    // *차트 컴포넌트 월별, 일별 탭
    const [tab, setTab] = useState<'daily' | 'monthly'>('daily')


    const { data: shopInfo } = useGetShopInfo()
    const shopId = shopInfo?.id
    // * 매장 승인 상태 
    const isVerified = useOwnerStoreStatus(state => state.isVerified)

   

    // * 선택된 달의 데이터만 나오게 되어있음 - 이건 리포트용임
    const { data: dailySalesData = []} = useGetDailySalesData(shopId, selectedMonth)



    // *선택달 전일 대비 데이터 - 리프트용
    const { data: diffData, isPending: isDiffPending } = useGetStatsData(shopId, selectedMonth)

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
    }, dataReadyForAi)

    // * 실적통계 카드에서 현재 달이 클릭되어있으면 차트그래프는 일별차트로 보이고 과거달 데이터면 월별 탭으로 바뀌고 월별합산으로 보임
    const handlePeriodClick = (newMonth: string) => {
        setSelectedMonth(newMonth)
        if (newMonth === thisMonth) {
            setTab('daily')
        } else {
            setTab('monthly')
        }
    }




    const handleToggleSummary = () => {
        setOpenSummary((prev) => !prev)
    }


    return (
        <main className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="mx-auto flex max-w-7xl flex-col gap-6">
                <StatsHeaderCard
                    toggle={handleToggleSummary}
                    openSummary={openSummary}
                    shopId={shopId}
                    selectedMonth={selectedMonth}
                    setSelectedMonth={handlePeriodClick}
                    isVerified={isVerified}
                />

                {openSummary && 
                    <SummaryCard 
                        selectedMonth={selectedMonth} 
                        topDays={topDays} 
                        diffData={diffData}
                        isPending={isDiffPending}
                    />
                }

                <DailyChart
                    isVerified={isVerified}
                    tab={tab}
                    setTab={setTab}
                    shopId={shopId}
                />

                <InsightCard content={aiInsight} isPending={aiPending} isVerified={isVerified}/>
            </div>
        </main>
    )
}