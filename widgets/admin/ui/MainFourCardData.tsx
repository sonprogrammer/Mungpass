'use client'

import { ArrowUpOutlined, CheckCircleOutlined, ClockCircleOutlined, ShopOutlined, UserOutlined } from "@ant-design/icons";
import { useList } from "@refinedev/core";
import { Card, Col, Row, Statistic, Tag, Typography, Spin } from "antd";

export function MainCardFourData () {

    // *심사 대기 데이터
    const { result: {data: pendingData, total:pendingTotal}, query: {isPending: isPendingPendingData}} = useList({
        resource: 'store_registrations',
        filters: [{field: 'status', operator: 'eq', value: 'PENDING'}]
    })
    
    // *승인된 데이터, 업체수
    const {result: {data: approvedData, total: approvedDataTotal}, query: {isPending: isApprovePending}} = useList({
        resource: 'store_registrations',
        filters: [{field: 'status', operator: 'eq', value: 'APPROVED'}]

    })

    if(isPendingPendingData || isApprovePending) return<Spin className="w-full py-10"/>

    // console.log('data', data, total)
    const summaryData = [
        { title: '심사 대기', value: 12, icon: <ClockCircleOutlined />, color: '#f97316', diff: '+2' },
        { title: '전체 파트너', value: 48, icon: <ShopOutlined />, color: '#3f8600', diff: '+5' },
        { title: '전체 유저', value: 1254, icon: <UserOutlined />, color: '#1677ff', diff: '+124' },
        { title: '오늘 활성 유저', value: 342, icon: <CheckCircleOutlined />, color: '#722ed1', diff: '+12%' },
      ];
    
    return(
        <Row gutter={[24, 24]} className="mb-8">
            {summaryData.map((item,i) => (
                <Col xs={24} sm={12} lg={6} key={i}>
                    <Card variant='outlined' className='shadow-sm hover:shadow-md transition-all'>
                        <Statistic 
                            title={<Typography.Text type='secondary'>{item.title}</Typography.Text>}
                            value={item.value}
                            valueStyle={{color: item.color, fontWeight: '900', fontSize: '28px'}}
                            prefix={item.icon}
                        />
                        <div className='mt-2 flex items-center gap-2'>
                            <Tag color='orange' bordered={false} icon={<ArrowUpOutlined />}>
                                {item.diff}
                            </Tag>
                            <Typography.Text type='secondary' style={{fontSize: '11px'}}>전일 대비</Typography.Text>
                        </div>
                    </Card>
                </Col>
            ))}
            
        </Row>
    )
}