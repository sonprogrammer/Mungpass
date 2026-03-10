'use client'

import { ApproveStoreBtn } from "@/features/admin/store/ui/ApproveStoreBtn";
import { FileSearchOutlined } from "@ant-design/icons"
import { DateField, useTable } from "@refinedev/antd"
import { Button, Space, Table, Tag, Typography } from "antd"

const { Text } = Typography;

export function StoreRegistTable() {
    const { tableProps, tableQuery } = useTable({
        resource: 'store_registrations',
        sorters: { initial: [{ field: 'created_at', order: 'desc' }] }
    })

    return (
        <Table {...tableProps} rowKey='id' bordered>

            {/* //*신청일 */}
            <Table.Column
                dataIndex='created_at'
                title='신청일'
                render={(val) => <DateField value={val} format="YY.MM.DD HH:mm" />}
            />
            
            {/* //*가게정보, 사업자 번호 */}
            <Table.Column
                title="지점 정보"
                fixed="left"
                render={(_, record) => (
                    <Space direction="vertical" size={0}>
                        <Text strong className="block truncate" style={{ maxWidth: '150px' }}>
                            {record.store_name}
                        </Text>
                        <Text type="secondary" className="text-[11px]!">{record.business_number}</Text>
                    </Space>
                )}
            />

            {/* //*사업자등록증 */}
            <Table.Column title='서류'
                render={(_, record) => (
                    <Button icon={<FileSearchOutlined />}
                        onClick={() => window.open(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/owner-docs/${record.biz_reg_image_url}`)}
                    >
                        보기
                    </Button>
                )}
            />

            {/* //* 심사 상태 */}
            <Table.Column
                dataIndex='status'
                title='상태'
                render={(status) => (
                    <Tag color={status === 'PENDING' ? 'orange' : status === 'APPROVED' ? 'green' : 'red'}>
                        {status}
                    </Tag>
                )}
             />

             {/* //* 심사 버튼 */}
             <Table.Column 
                title='심사'
                render={(_,record) => (
                    record.status === 'PEDNING' && (
                        <ApproveStoreBtn 
                            storeId={record.id}
                            storeName={record.store_name}
                            onSuccess={() => tableQuery.refetch()}
                        />
                    )
                )}
             />


        </Table>
    )
}