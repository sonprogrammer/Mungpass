'use client'

import { ArrowDownOutlined, ArrowUpOutlined, ClockCircleOutlined, ShopOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { useList } from "@refinedev/core";
import { Card, Col, Row, Statistic, Tag, Typography, Spin } from "antd";

export function MainCardFourData () {
    const today = new Date()
    today.setHours(0, 0,0,0)

    // *심사 대기 데이터
    const { result: {total:pendingTotal}, query: pendingQuery} = useList({
        resource: 'store_registrations',
        filters: [{field: 'status', operator: 'eq', value: 'PENDING'}]
    })
    
    // *승인된 데이터, 업체수
    const {result: { total: approvedDataTotal}, query: approvedQuery} = useList({
        resource: 'store_registrations',
        filters: [{field: 'status', operator: 'eq', value: 'APPROVED'}]
    })

    // * 신규 유저
    const {result: {total: newUserTotal}, query: newUserQuery} = useList({
        resource: 'profiles',
        filters:[{field: 'join_date', operator: 'gte', value: today.toISOString().split("T")[0]}]
    })

    // * 누적 회원
    const {result: {total: allUserTotal}, query: allUserQuery} = useList({
        resource: 'profiles'
    })


    // * 전일 대비
    const {result : { data: statsData}, query: statsQuery} = useList({
        resource: 'daily_stats',
        pagination: { pageSize: 2},
        sorters: [{field: 'date', order: 'desc'}]
    })

    const yesterdayStats = statsData?.[1]

    const getDiff = (todayVal:number=0, yesterdayVal: number =0) => {
        const diff = todayVal - yesterdayVal
        if(diff > 0) return `+${diff}`
        return `${diff}`
    }
    
    const isLoading = [pendingQuery, approvedQuery, newUserQuery, allUserQuery, statsQuery].some(p => p.isPending)

    // TODO 스켈레톤으로 구현
    if(isLoading) {
        return<Spin className="w-full py-10"/> 
    }

    const summaryData = [
        { 
            title: '심사 대기', 
            value: pendingTotal || 0, 
            icon: <ClockCircleOutlined />, 
            color: '#f97316',
            diff: getDiff(pendingTotal, yesterdayStats?.pending_review_count)
        },
        { 
            title: '전체 파트너', 
            value: approvedDataTotal || 0, 
            icon: <ShopOutlined />,
            color: '#3f8600',
            diff: getDiff(approvedDataTotal, yesterdayStats?.total_partner_count)
        },
        { 
            title: '전체 유저',
            value: allUserTotal || 0,
            icon: <UserOutlined />,
            color: '#1677ff',
            diff: getDiff(allUserTotal, yesterdayStats?.total_user_count)
        },
        {
            title: '오늘 신규 유저', 
            value: newUserTotal || 0, 
            icon: <UserAddOutlined />, 
            color: '#722ed1', 
            diff: getDiff(newUserTotal, yesterdayStats?.new_user_count)
        },
      ];
    
    return(
        <Row gutter={[24, 24]} className="mb-8">
            {summaryData.map((item,i) => {
                const isUp = item.diff.startsWith('+')
                const isZero = item.diff === '0'
                
                return(
                <Col xs={24} sm={12} lg={6} key={i}>
                    <Card variant='outlined' className='shadow-sm hover:shadow-md transition-all'>
                        <Statistic 
                            title={<Typography.Text type='secondary'>{item.title}</Typography.Text>}
                            value={item.value}
                            valueStyle={{color: item.color, fontWeight: '900', fontSize: '28px'}}
                            prefix={item.icon}
                        />
                        <div className='mt-2 flex items-center gap-2'>
                            <Tag color={isZero ? 'default' : isUp ? 'orange' : 'blue'} bordered={false} 
                            icon={isUp ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                            >
                                {item.diff}
                            </Tag>
                            <Typography.Text type='secondary' style={{fontSize: '11px'}}>전일 대비</Typography.Text>
                        </div>
                    </Card>
                </Col>
            )
            }
            )}
            
        </Row>
    )
}