'use client'

import { Typography, Card } from "antd";
import { StoreRegistTable } from "@/widgets/admin/ui/StoreRegistTable";



export default function StoreRegistrationListPage() {
  

  return (
    <div>
      <div className='mb-6'>
        <Typography.Title>입점 심사 관리</Typography.Title>
        <p className="text-slate-500">사장님들의 입점 신청 내욕을 검토하고 승인합니다.</p>
      </div>

      <Card className="shadow-sm">
        <StoreRegistTable />
      </Card>
    </div>
  )
}