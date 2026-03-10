'use client'

import { RightOutlined } from "@ant-design/icons";
import { Button, Card, List, Tag, Typography } from "antd";
import Link from "next/link";

export function RecentRegistrations() {
    const recentActivities = [
        { id: 1, store: '멍멍 유치원 강남점', time: '10분 전', status: 'PENDING' },
        { id: 2, store: '반려견 호텔 쉼표', time: '1시간 전', status: 'PENDING' },
        { id: 3, store: '해피퍼피 미용실', time: '3시간 전', status: 'APPROVED' },
      ];
    
    return(
        <Card
            title={<Typography.Text strong>최근 입점 신청 현황</Typography.Text>}
            extra={<Link href='/admin/stores'><Button type="link" icon={<RightOutlined />}/>전체보기</Link>}
            variant="outlined"
            className="shadow-sm h-full"
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
                            title={item.store}
                            description={`${item.time} 전 신청됨`}
                        />

                    </List.Item>
                )}
            />
            
        </Card>
    )
}