'use client'

import { Modal, Badge, Button, Tag } from 'antd'
import { useState } from 'react'
import { InfoCircleOutlined, CheckCircleFilled, ClockCircleFilled, CloseCircleFilled } from '@ant-design/icons'

//목업
const STATUS_CONFIG = {
  approved: {
    label: '승인 완료',
    color: 'success',
    icon: <CheckCircleFilled className="text-emerald-500" />,
    title: '매장 승인이 완료되었어요',
  },
  pending: {
    label: '승인 대기',
    color: 'warning',
    icon: <ClockCircleFilled className="text-amber-500" />,
    title: '현재 승인 검토가 진행 중이에요',
  },
  rejected: {
    label: '승인 반려',
    color: 'error',
    icon: <CloseCircleFilled className="text-rose-500" />,
    title: '승인이 불허되었어요',
    adminMessage: '사업자 등록증의 상호명과 신청한 매장명이 일치하지 않아 재확인이 필요합니다.',
  },
} as const;

export function MyStoreHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
//목업  
  const approvalStatus: keyof typeof STATUS_CONFIG = 'pending'
  const current = STATUS_CONFIG[approvalStatus]
  const dateValue = '2026.03.21'

  return (
    <>
      <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">{current.icon}</div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">매장 승인 상태</h1>
              <p className="text-sm text-gray-500">{current.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge status={current.color} text={current.label} className="mr-2 font-medium" />
            <Button 
              type="default" 
              shape="round" 
              onClick={() => setIsModalOpen(true)}
              className="border-gray-200 font-medium text-gray-600 hover:text-orange-500 hover:border-orange-500"
            >
              상세보기
            </Button>
          </div>
        </div>
      </section>


      <Modal
        title={
          <div className="flex flex-col gap-1 py-2">
            <span className="text-xs font-bold text-orange-500 uppercase">Detail View</span>
            <span className="text-xl font-bold">승인 처리 정보</span>
          </div>
        }
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button 
            key="submit" 
            type="primary" 
            size="large" 
            block 
            className="h-12 rounded-xl bg-gray-900 hover:bg-gray-800!"
            onClick={() => setIsModalOpen(false)}
          >
            확인하였습니다
          </Button>
        ]}
        centered
        width={420}
        closeIcon={<span className="text-gray-400">✕</span>}
      >
        <div className="py-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="text-[11px] font-bold text-gray-400">현재 상태</p>
              <div className="mt-2">
                <Tag color={current.color} className="m-0 border-none px-2 font-bold">
                  {current.label}
                </Tag>
              </div>
            </div>
            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="text-[11px] font-bold text-gray-400">처리 일시</p>
              <p className="mt-2 text-sm font-bold text-gray-900">{dateValue}</p>
            </div>
          </div>

          {approvalStatus === 'rejected' && (
            <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4">
              <div className="mb-2 flex items-center gap-2 text-rose-600">
                <InfoCircleOutlined className="text-xs" />
                <span className="text-xs font-bold">반려 사유 안내</span>
              </div>
              <p className="text-sm leading-relaxed text-gray-700">
                {current.adminMessage}
              </p>
            </div>
          )}

          <div className="rounded-2xl bg-blue-50/50 p-4">
            <p className="text-[11px] font-bold text-blue-400">안내 사항</p>
            <p className="mt-1 text-xs leading-relaxed text-blue-700/70">
              승인 절차는 영업일 기준 최대 3일까지 소요될 수 있습니다. 문의사항은 1:1 상담을 이용해 주세요.
            </p>
          </div>
        </div>
      </Modal>
    </>
  )
}