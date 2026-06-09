'use client'

import { Profile } from "@/entities/admin/inquiry/model"
import { columns } from "@/features/admin/user/config/columns"
import { useGetUserInfo, UserSearchFilters } from "@/features/admin/user/model"
import { Table } from "antd"


interface DisplayUserByFilterProps {
    filters: UserSearchFilters
    onSelectUser: (user: Profile | null) => void
}
// const columns = [
//     {
//         title:
//             <Typography.Text type="secondary">이름</Typography.Text>,
//         dataIndex: 'name',
//         key: 'name',
//         className: 'font-semibold text-slate-800'
//     },
//     {
//         title: <Typography.Text type="secondary">매장명</Typography.Text>,
//         key: 'name',
//         render: (record: Profile) => {
//             if (Array.isArray(record.shop)) {
//                 return record.shop[0]?.name || '-';
//             }
//             return record.shop?.name || '-'
//         }
//     },
//     {
//         title: <Typography.Text type="secondary">회원 유형</Typography.Text>,
//         dataIndex: 'role',
//         key: 'role',
//         render: (role: 'user' | 'owner') => {
//             if (role === 'owner') {
//                 return <span className="text-emerald-500 font-bold">점주</span>
//             }
//             return <span className="text-orange-500 font-bold">견주</span>
//         }
//     },
//     {
//         title: <Typography.Text type="secondary">가입일</Typography.Text>,
//         dataIndex: 'join_date',
//         key: 'created_at',
//         render: (date: string) => (
//             <span className="text-slate-500 text-sm">
//                 {date ? format(new Date(date), 'yy-MM-dd') : '-'}
//             </span>
//         )
//     },
// ]
export function DisplayUserByFilter({ filters, onSelectUser }: DisplayUserByFilterProps) {

    const { data: userList = [], isPending, fetchStatus } = useGetUserInfo(filters)

    const isFetching = isPending && fetchStatus !== 'idle'

    return (
        <div>
            <Table
                dataSource={userList}
                columns={columns}
                rowKey='id'
                loading={isFetching}
                pagination={{ pageSize: 5 }}
                onRow={(record: Profile) => ({
                    onClick: () => {
                        onSelectUser(record)
                    },
                    className: 'cursor-pointer hover:bg-slate-50/80 transition-colors'
                })}
                locale={{
                    emptyText: (
                        <div>
                            {filters.keyword && filters.keyword.trim() !== '' ? (
                                <div className="py-12 text-center">
                                    <p className="text-slate-400 text-base font-medium mb-1">🧐 검색된 회원 정보가 없습니다.</p>
                                    <p className="text-xs text-slate-400">이름을 다시 한번 확인해 주세요.</p>
                                </div>
                            )
                                : (
                                    <div>
                                        <p className="text-slate-400 text-base">회원 정보를 검색해 주세요.</p>
                                    </div>
                                )
                            }
                        </div>
                    )
                }}
            />
        </div>
    )
}