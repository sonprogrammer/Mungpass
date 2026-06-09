import { Profile } from "@/entities/admin/inquiry/model"
import { Typography } from "antd"
import { format } from "date-fns"

export const columns = [
    {
        title:
            <Typography.Text type="secondary">이름</Typography.Text>,
        dataIndex: 'name',
        key: 'name',
        className: 'font-semibold text-slate-800'
    },
    {
        title: <Typography.Text type="secondary">매장명</Typography.Text>,
        key: 'shoporname',
        render: (record: Profile) => {
            if (Array.isArray(record.shop)) {
                return record.shop[0]?.name || '-';
            }
            return record.shop?.name || '-'
        }
    },
    {
        title: <Typography.Text type="secondary">회원 유형</Typography.Text>,
        dataIndex: 'role',
        key: 'role',
        render: (role: 'user' | 'owner') => {
            if (role === 'owner') {
                return <span className="text-emerald-500 font-bold">점주</span>
            }
            return <span className="text-orange-500 font-bold">견주</span>
        }
    },
    {
        title: <Typography.Text type="secondary">가입일</Typography.Text>,
        dataIndex: 'join_date',
        key: 'created_at',
        render: (date: string) => (
            <span className="text-slate-500 text-sm">
                {date ? format(new Date(date), 'yy-MM-dd') : '-'}
            </span>
        )
    },
]