'use client'

import { Card, Col, Row, Statistic, Table, Tag, Button, Empty, Typography, Space } from 'antd';
import { PlayCircleOutlined, ThunderboltOutlined, UserOutlined } from '@ant-design/icons';
import { useUserStore } from '@/entities/user/model/useUserStore';
import { OwnerSumCards } from '@/widgets/owner/ui/OwnerSumCards';
import { RealtimeUsageTable } from '@/widgets/owner/ui/RealtimeUsageTable';

const { Title, Text } = Typography;

export default function OwnerDashboard() {
    const profile = useUserStore(state => state.profile)
    console.log('전역변수 프로필', profile)

  const currentUsers = [
    { id: 1, petName: '보리', breed: '시바견', startTime: '10:30', duration: '2시간 15분', type: '유치원' },
    { id: 2, petName: '두부', breed: '말티즈', startTime: '11:45', duration: '1시간 00분', type: '호텔' },
  ]

  // 오늘 완료된 내역
  const todayDone = [
    { id: 101, petName: '초코', type: '유치원', totalTime: '4시간 30분', fee: '22,000원' },
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
          <Card title="최근 완료 기록" className="shadow-sm">
            <div className="flex flex-col gap-4">
              {todayDone.map(item => (
                <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <Text strong>{item.petName}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '12px' }}>{item.totalTime} 이용</Text>
                  </div>
                  <Text strong className="text-green-600">{item.fee}</Text>
                </div>
              ))}
              <Button block type="dashed">전체 기록 보기</Button>
            </div>
          </Card>

          <Card className="mt-6 bg-orange-50 border-orange-200">
            <Title level={5}>사장님 Tip</Title>
            <Text type="secondary" >
              유저가 QR을 찍으면 자동으로 목록에 추가됩니다.
            </Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
}