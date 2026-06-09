'use client'

import { Profile } from "@/entities/admin/inquiry/model"
import { columns } from "@/features/admin/user/config/columns";
import { Table } from "antd"

interface UserTableProps{
    userList: Profile[];
    loading?: boolean;
    onRowClick?: (record: Profile) => void
}

export function UserTable({userList, loading, onRowClick}: UserTableProps) {
    return (
        <Table
            dataSource={userList}
            columns={columns}
            rowKey="id"
            loading={loading}
            pagination={{ pageSize: 5 }}
            onRow={(record) => ({
                onClick: () => onRowClick?.(record),
                className: 'cursor-pointer hover:bg-slate-50/80 transition-colors'
            })}
        />

    )
}