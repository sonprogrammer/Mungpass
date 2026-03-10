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
import { MainCardFourData } from "@/widgets/admin/ui/MainFourCardData";
import { RecentRegistrations } from "@/widgets/admin/ui/RecentRegistrations";
import { QuickActions } from "@/features/admin/ui/QuickActions";

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
    <div className='max-w-400 m-0'>
      <header className='mb-8'>
        <Typography.Title level={4} style={{margin: 0}}>안녕하세요 관리자님!</Typography.Title>
        <Typography.Text type="secondary"> 오늘의 멍패스 운영현황을 한눈에 확인하세요</Typography.Text>
      </header>

      {/* //* 4개 데이터 카드 */}
      <MainCardFourData />

      <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <RecentRegistrations />
          </Col>

          <Col xs={24} lg={8}>
            <QuickActions />
          </Col>
          
      </Row>
      
    </div>
  );
}