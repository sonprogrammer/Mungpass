'use client'

import { getAdminUrl } from "@/features/admin/store/api";
import { ApproveStoreBtn } from "@/features/admin/store/ui";
import { useGetUserById } from "@/features/admin/user/model";
import { AdminUserDetailModal } from "@/features/admin/user/ui";
import { FileSearchOutlined } from "@ant-design/icons"
import { DateField, useTable } from "@refinedev/antd"
import { useInvalidate } from "@refinedev/core";
import { Button, message, Modal, Space, Table, Tag, Typography } from "antd"
import { useState } from "react";

const { Text } = Typography;

export function StoreRegistTable() {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [selectedUserId, setSelectedUserId] = useState<string>('')
    const invalidate = useInvalidate()

    const { data: userInfo } = useGetUserById(selectedUserId)

    const { tableProps } = useTable({
        resource: 'store_registrations',
        sorters: { initial: [{ field: 'created_at', order: 'desc' }] },

    })

    const handleOpenDocs = async (path: string) => {

        const url = await getAdminUrl(path)

        if (!url) {
            message.error('서류 주소를가져오지 못했습니다')
            return
        }

        if (!path.toLowerCase().includes('.pdf')) {
            const img = new Image()
            img.src = url
        }
        setPreviewUrl(url)
    }


    return (
        <>
            <Table {...tableProps}
                rowKey='id'
                bordered
                onRow={(record) => ({
                    onClick: () => {
                        setSelectedUserId(record.owner_id)
                    }
                })}
            >

                {/* //*신청일 */}
                <Table.Column
                    dataIndex='created_at'
                    title='신청일'
                    render={(val) => <DateField value={val} format="YY.MM.DD" />}
                />

                {/* //*가게정보, 사업자 번호 */}
                <Table.Column
                    title="지점 정보"
                    align='center'
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
                <Table.Column title='서류' align='center'
                    render={(_, record) => {
                        return (
                            <Button
                                icon={<FileSearchOutlined />}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleOpenDocs(record.biz_reg_image_url)
                                }}
                            >
                                보기
                            </Button>
                        )
                    }}
                />

                {/* //* 심사 상태 */}
                <Table.Column
                    dataIndex='status'
                    title='상태'
                    render={(status) => {
                        const colors = { PENDING: 'orange', APPROVED: 'green', REJECTED: 'red' }
                        const labels = { PENDING: '대기', APPROVED: '승인', REJECTED: '반려' }
                        return (
                            <Tag color={colors[status as keyof typeof colors] || 'default'}>
                                {labels[status as keyof typeof labels] || status}
                            </Tag>
                        )
                    }}
                />

                {/* //* 심사 버튼 */}
                <Table.Column
                    title='심사'
                    render={(_, record) => (
                        <div onClick={(e) => e.stopPropagation()}>
                            {record.status === 'PENDING' ? (
                                <ApproveStoreBtn
                                    registrationID={record.id}
                                    registrationStoreName={record.store_name}
                                    onSuccess={() => invalidate({ resource: 'store_registrations', invalidates: ['list'] })}
                                />
                            ) : (
                                <Tag>
                                    완료
                                </Tag>
                            )
                            }
                        </div>
                    )}
                />


            </Table>


            <Modal
                open={!!previewUrl}
                footer={null}
                width={800}
                onCancel={() => setPreviewUrl(null)}
                centered={true}
            >

                {previewUrl && (
                    previewUrl.toLowerCase().includes(".pdf") ? (
                        <iframe
                            src={previewUrl}
                            width="100%"
                            height="600px"
                            style={{ border: "none" }}
                        />
                    ) : (
                        <img
                            src={previewUrl}
                            style={{ width: "100%" }}
                            onContextMenu={(e) => e.preventDefault()}
                            draggable={false}
                        />
                    )
                )}

            </Modal>

            <AdminUserDetailModal
                open={!!selectedUserId && !!userInfo}
                onClose={() => setSelectedUserId('')}
                user={userInfo}
                onSuccess={() => {
                    setSelectedUserId('')
                }}
            />

        </>
    )
}