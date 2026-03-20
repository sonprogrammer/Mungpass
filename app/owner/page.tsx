'use client'

import { Col, Row} from 'antd';
import { useUserStore } from '@/entities/user/model/useUserStore';
import { OwnerSumCards } from '@/widgets/owner/ui/OwnerSumCards';
import { RealtimeUsageTable } from '@/widgets/owner/ui/RealtimeUsageTable';
import { Tip } from '@/widgets/owner/ui/Tip';
import { useGetCurrentUsageLogs } from '@/entities/check-in/model/useGetCurrentUsageLogs';


export default function OwnerDashboard() {
    const profile = useUserStore(state => state.profile)



 const { data: currentLogs=[] } = useGetCurrentUsageLogs()

  return (
    <div className="max-w-7xl mx-auto">
      <Row gutter={[24, 24]}>
        {/* //* 상단 요약 카드 */}
        <Col span={24}>
          <OwnerSumCards currentCount={currentLogs.length}/>
        </Col>

        {/*//* 메인: 현재 이용 현황 - 일반유저한테도 뿌려주게 */}
        <Col xs={24} lg={16}>
          <RealtimeUsageTable items={currentLogs} />
        </Col>

        {/* //* 최근 퇴실 기록 */}
        <Col xs={24} lg={8}>
          <Tip />
        </Col>
      </Row>
    </div>
  );
}