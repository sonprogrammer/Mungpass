'use client'

import { Profile } from "@/entities/admin/inquiry/model"
import { columns } from "@/features/admin/user/config/columns"
import { useGetUserInfo, UserSearchFilters } from "@/features/admin/user/model"
import { Table } from "antd"


interface DisplayUserByFilterProps {
    filters: UserSearchFilters
    onSelectUser: (user: Profile | null) => void
}

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