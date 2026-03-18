import { Card, Table, Tag, Button, Space, Typography, Empty } from 'antd';
import { ThunderboltOutlined } from '@ant-design/icons';
import { CurrentUser } from '@/widgets/owner/model/type';

export function RealtimeUsageTable({ data }: { data: CurrentUser[] }) {
    return (
        <Card
            title={<Space><ThunderboltOutlined className="text-orange-500" /> 실시간 입실 유저</Space>}
            className="shadow-sm border-orange-100"
        >
            {data.length > 0 ? (
                <Table
                    dataSource={data}
                    pagination={false}
                    rowKey="id"
                    columns={[
                        {
                            title: '반려견명', dataIndex: 'petName', key: 'petName', render: (text, record) => (
                                <Space>
                                    <Typography.Text strong>{text}</Typography.Text>
                                    <Typography.Text type="secondary">({record.breed})</Typography.Text>
                                </Space>
                            )
                        },
                        { title: '입실 시간', dataIndex: 'startTime', key: 'startTime' },
                        { title: '경과 시간', dataIndex: 'duration', key: 'duration', render: (time) => <Tag color="blue">{time}</Tag> },
                        { title: '구분', dataIndex: 'type', key: 'type' },
                        { title: '관리', key: 'action', render: () => <Button size="small" danger ghost>퇴실 처리</Button> }
                    ]}
                />
            ) : (
                <Empty description="현재 이용 중인 강아지가 없습니다." />
            )}
        </Card>
    )
}