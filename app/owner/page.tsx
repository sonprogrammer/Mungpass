'use client'

import { Col, Row } from 'antd';
import { OwnerSumCards } from '@/widgets/owner/ui/OwnerSumCards';
import { RealtimeUsageTable } from '@/widgets/owner/ui/RealtimeUsageTable';
import { Tip } from '@/widgets/owner/ui/Tip';
import { useGetCurrentUsageLogs } from '@/entities/check-in/model/useGetCurrentUsageLogs';
import { useGetTodayVisitCount } from '@/entities/check-in/model/useGetTodayVisitCount';
import { useGetAvgTime } from '@/entities/owner/model/useGetAvgTime';
import { useGetShopInfo } from '@/entities/owner/model/useGetShopInfo';
import { useGetExpectedSales } from '@/entities/owner/model/useGetExpectedSales';


// TODO 오늘 예상 매출, 평균 이용시간 api연결

export default function OwnerDashboard() {

  const {data: shopInfo} = useGetShopInfo()

  // * 오늘 방뭄수
  const { data: todayVisitCount } = useGetTodayVisitCount()

  // * 현재 이용중인 반려견수
  const { data: currentLogs = [] } = useGetCurrentUsageLogs()

  // * 평균 이용 시간
  const { data : avgTime } = useGetAvgTime(shopInfo?.id || '')
  console.log('avgTime', avgTime)

  //* 오늘 예상 매출
  const { data: expectedSales } = useGetExpectedSales(shopInfo?.id || '')
  console.log('expectedSales', expectedSales)

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
          />
        </Col>

        {/*//* 메인: 현재 이용 현황 - 일반유저한테도 뿌려주게 */}
        <Col xs={24}>
          <RealtimeUsageTable items={currentLogs} />
        </Col>

        {/* //* 최근 퇴실 기록 */}
        <Col span={24}>
          <Tip />
        </Col>
      </Row>
    </div>
  );
}