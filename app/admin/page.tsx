'use client'

import { Row, Col, Card, Statistic, Typography, Divider, List, Tag, Button, Avatar } from "antd";
import { 
  ShopOutlined, 
  UserOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  ArrowUpOutlined,
  RightOutlined
} from "@ant-design/icons";
import Link from "next/link";

const { Title, Text } = Typography;

export default function AdminMainPage() {
  //* 목업데이터
  const summaryData = [
    { title: '심사 대기', value: 12, icon: <ClockCircleOutlined />, color: '#f97316', diff: '+2' },
    { title: '전체 파트너', value: 48, icon: <ShopOutlined />, color: '#3f8600', diff: '+5' },
    { title: '전체 유저', value: 1254, icon: <UserOutlined />, color: '#1677ff', diff: '+124' },
    { title: '오늘 활성 유저', value: 342, icon: <CheckCircleOutlined />, color: '#722ed1', diff: '+12%' },
  ];

  //* 목업데이터
  const recentActivities = [
    { id: 1, store: '멍멍 유치원 강남점', time: '10분 전', status: 'PENDING' },
    { id: 2, store: '반려견 호텔 쉼표', time: '1시간 전', status: 'PENDING' },
    { id: 3, store: '해피퍼피 미용실', time: '3시간 전', status: 'APPROVED' },
  ];

  return (
    <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
      {/* //*상단 */}
      <div className="mb-8">
        <Title level={4} style={{ margin: 0 }}>안녕하세요, 관리자님! 👋</Title>
        <Text type="secondary">오늘의 멍패스 운영 현황을 한눈에 확인하세요.</Text>
      </div>

      {/* //*4개 카드 */}
      <Row gutter={[24, 24]} className="mb-8">
        {summaryData.map((item, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card variant='outlined' className="shadow-sm hover:shadow-md transition-shadow">
              <Statistic
                title={<Text type="secondary">{item.title}</Text>}
                value={item.value}
                valueStyle={{ color: item.color, fontWeight: '900', fontSize: '28px' }}
                prefix={item.icon}
              />
              <div className="mt-2">
                <Tag color="orange" bordered={false} icon={<ArrowUpOutlined />}>
                   {item.diff}
                </Tag>
                <Text type="secondary" className="ml-1 text-xs!">전일 대비</Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[24, 24]}>
        {/* //* 입점신청 현황*/}
        <Col xs={24} lg={16}>
          <Card 
            title={<Text strong>최근 입점 신청 현황</Text>} 
            extra={<Link href="/admin/stores"><Button type="link" icon={<RightOutlined />}>전체보기</Button></Link>}
            variant='outlined' 
            className="shadow-sm! h-full!"
          >
            <List
              itemLayout="horizontal"
              dataSource={recentActivities}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Tag key={item.id} color={item.status === 'PENDING' ? 'processing' : 'success'}>
                      {item.status}
                    </Tag>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={`https://api.dicebear.com/7.x/initials/svg?seed=${item.store}`} />}
                    title={item.store}
                    description={`${item.time} 신청됨`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* //*빠른 작업 */}
        <Col xs={24} lg={8}>
          <Card title={<Text strong>빠른 작업</Text>} bordered={false} className="shadow-sm h-full">
            <div className="flex! flex-col! gap-3!">
              <Button block size="large" icon={<ShopOutlined />}>신규 지점 등록</Button>
              <Button block size="large" icon={<UserOutlined />}>회원 정보 조회</Button>
              <Divider style={{ margin: '12px 0' }} />
            </div>
          </Card>
        </Col>

        {/* //TODO 공지 사항이나 그런거 추가 */}
      </Row>
    </div>
  );
}