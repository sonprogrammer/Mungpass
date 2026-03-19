'use client'

import { Card, Col, Row, Statistic, Table, Tag, Button, Empty, Typography, Space } from 'antd';
import { PlayCircleOutlined, ThunderboltOutlined, UserOutlined } from '@ant-design/icons';
import { useUserStore } from '@/entities/user/model/useUserStore';
import { OwnerSumCards } from '@/widgets/owner/ui/OwnerSumCards';
import { RealtimeUsageTable } from '@/widgets/owner/ui/RealtimeUsageTable';
import { RecentHistory } from '@/widgets/owner/ui/RecendtHistory';
import { Tip } from '@/widgets/owner/ui/Tip';


export default function OwnerDashboard() {
    const profile = useUserStore(state => state.profile)
    console.log('전역변수 프로필', profile)

  const currentUsers = [
    { id: 1, petName: '보리', breed: '시바견', startTime: '15:30', duration: '2시간 15분', type: '유치원', petImage: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=200&auto=format&fit=crop' },
    { id: 2, petName: '두부', breed: '말티즈', startTime: '11:45', duration: '1시간 00분', type: '호텔'},
    { id: 2, petName: '두부', breed: '말티즈', startTime: '11:45', duration: '1시간 00분', type: '호텔'},

  ]

  // 오늘 완료된 내역
  const todayDone = [
    { id: 101, petName: '초코', type: '유치원', totalTime: '4시간 30분', price: '22,000원' },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <Row gutter={[24, 24]}>
        {/* //* 상단 요약 카드 */}
        <Col span={24}>
          <OwnerSumCards currentCount={currentUsers.length}/>
        </Col>

        {/*//* 메인: 현재 이용 현황 - 일반유저한테도 뿌려주게 */}
        <Col xs={24} lg={16}>
          <RealtimeUsageTable data={currentUsers}/>
        </Col>

        {/* //* 최근 퇴실 기록 */}
        <Col xs={24} lg={8}>
          <Tip />
        </Col>
      </Row>
    </div>
  );
}