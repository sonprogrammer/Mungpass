'use client'

import { Row, Col, Typography } from "antd";
import { MainCardFourData } from "@/widgets/admin/ui/MainFourCardData";
import { RecentRegistrations } from "@/widgets/admin/ui/RecentRegistrations";
import { QuickActions } from "@/features/admin/ui/QuickActions";

export default function AdminMainPage() {
 

  

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