'use client'

import { RightOutlined } from "@ant-design/icons";
import { useList } from "@refinedev/core";
import { Button, Card, List, Spin, Tag, Typography } from "antd";
import dayjs from "dayjs";
import Link from "next/link";

export function RecentRegistrations() {
    
    const { result: { total: registerTotal, data: registerData }, query: { isPending } } = useList({
        resource: 'store_registrations',
        pagination: { pageSize: 5 },
        sorters: [{ field: 'created_at', order: 'desc' }]
    })


    return (
        <Card
            title={<Typography.Text strong>최근 입점 신청 현황</Typography.Text>}
            extra={<Link href='/admin/stores'><Button type="link" icon={<RightOutlined />} />전체보기</Link>}
            variant="outlined"
            className="shadow-sm h-full"
        >
            {isPending ? (
                <div className="flex justify-center py-10"><Spin /></div>
            ) : (

                <List
                    itemLayout="horizontal"
                    dataSource={registerData}
                    renderItem={(item) => {
                        const statusConfig: Record<string, {color: string, text: string}> = { 
                            PENDING: {color: 'orange', text: '대기'},
                            APPROVED: { color: 'green', text: '승인'},
                            REJECTED: {color: 'red', text: '반려'}
                        }
                        return (
                        <List.Item
                            actions={[
                                <Tag key={item.id} color={statusConfig[item.status].color}>
                                    {statusConfig[item.status].text}
                                </Tag>
                            ]}
                        >
                            <List.Item.Meta
                                title={<Typography.Text strong>{item.store_name}</Typography.Text>}
                                description={dayjs(item.created_at).fromNow()}
                            />

                        </List.Item>
                        
                    )}}
                />
            )}
        </Card>
    )
}