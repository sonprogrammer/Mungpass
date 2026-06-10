'use client'

import { RightOutlined } from "@ant-design/icons";
import { useList } from "@refinedev/core";
import { Button, Card, List, Spin, Tag, Typography } from "antd";
import { format, subDays, formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import Link from "next/link";

export function RecentRegistrations() {

    const weekAgo = format(subDays(new Date(), 7), 'yyyy-MM-dd')

    const { result: { total: registerTotal, data: registerData }, query: { isPending } } = useList({
        resource: 'store_registrations',
        pagination: { pageSize: 3 },
        sorters: [{ field: 'created_at', order: 'desc' }],
        filters: [{field: 'created_at', operator: 'gte', value: weekAgo}]
    })


    return (
        <Card
            title={
                <div className="flex items-center gap-2">
                    <Typography.Text strong>최근 입점 신청 현황</Typography.Text>
                    <Tag color="blue">{registerTotal ?? 0}건</Tag>
                </div>
            }
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
                    locale={{ emptyText: '최근 7일 내 입점 신청이 없습니다.' }}
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
                                description={formatDistanceToNow(new Date(item.created_at), { addSuffix: true, locale: ko })}
                            />

                        </List.Item>
                        
                    )}}
                />
            )}
        </Card>
    )
}