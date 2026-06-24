'use client'

import { Col, Row } from 'antd';
import { OwnerSumCards, Tip, RealtimeUsageTable } from '@/widgets/owner/ui';
import { useGetCurrentUsageLogs, useGetTodayVisitCount, useRealTimeUsage } from '@/entities/check-in/model';
import { useGetAvgTime, useGetShopInfo, useGetExpectedSales, useOwnerStoreStatus } from '@/entities/owner/model';


export function OwnerMainPageWidget() {

  const { data: shopInfo, isPending: isShopInfoPending } = useGetShopInfo()
  console.log('shopInfo;', shopInfo)

  // * 현재 승인된매장인지 확인
  const isVerified = useOwnerStoreStatus(state => state.isVerified)

  useRealTimeUsage(shopInfo?.id)

  // * 오늘 방뭄수
  const { data: todayVisitCount, isPending: isTodayVisitPedning } = useGetTodayVisitCount()

  // * 현재 이용중인 반려견수
  const { data: currentLogs = [], isPending: isCurrentLogsPending } = useGetCurrentUsageLogs()

  // * 평균 이용 시간
  const { data: avgTime, isPending: isAvgTimePending } = useGetAvgTime(shopInfo?.id || '')

  // * 오늘 매출 - 체크인시 우선적으로 그 상품 가격이 나오고 상품시간초과시 유예시간 적용후 초과시간 만큼 계산된 매출이 계산되어 정산
  const { data: expectedSales, isPending: isExpectedSalesPending } = useGetExpectedSales(shopInfo?.id || '')

  const isSummaryLoading = isVerified
    ? (isTodayVisitPedning || isAvgTimePending || isExpectedSalesPending || isShopInfoPending)
    : false

  const isRealTimeLoading = isVerified ? isCurrentLogsPending : false

  return (
    <div className="mx-auto p-6">
      <Row gutter={[24, 24]}>
        {/* //* 상단 요약 카드 */}
        <Col span={24}>
          <OwnerSumCards
            currentCount={currentLogs.length}
            todayVisitCount={todayVisitCount}
            avgTime={avgTime}
            expectedSales={expectedSales}
            loading={isSummaryLoading}
            isVerified={isVerified}
          />
        </Col>

        {/*//* 메인: 현재 이용 현황 - 일반유저한테도 뿌려주게 */}
        <Col xs={24}>
          <RealtimeUsageTable items={currentLogs} loading={isRealTimeLoading} isVerified={isVerified} />
        </Col>

        {/* //* 최근 퇴실 기록 */}
        <Col span={24}>
          <Tip />
        </Col>
      </Row>
    </div>
  );
}