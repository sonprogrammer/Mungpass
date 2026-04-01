'use client'

import { Modal, Badge, Button, Tag, Divider, Tooltip } from 'antd'
import { useMemo, useState } from 'react'
import { CheckCircleFilled, ClockCircleFilled, CloseCircleFilled } from '@ant-design/icons'
import { Download, AlertCircle, UploadCloud, FileText } from 'lucide-react';
import { StepStatus } from '@/features/auth/ui/owner/StepStatus';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale'
import { MyStoreHeaderProps } from '@/entities/owner/my-shop/model/types';

const STATUS_CONFIG = {
    APPROVED: {
        label: '승인 완료',
        color: 'success',
        icon: <CheckCircleFilled className="text-emerald-500!" />,
        title: '매장 승인이 완료되었어요',
    },
    PENDING: {
        label: '승인 대기',
        color: 'warning',
        icon: <ClockCircleFilled className="text-amber-500!" />,
        title: '현재 승인 검토가 진행 중이에요',
    },
    REJECTED: {
        label: '승인 반려',
        color: 'error',
        icon: <CloseCircleFilled className="text-rose-500!" />,
        title: '승인이 불허되었어요',
        adminMessage: '사업자 등록증의 상호명과 신청한 매장명이 일치하지 않아 재확인이 필요합니다.',
    },
} as const;

export function MyStoreHeader({ regisData }: MyStoreHeaderProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const currentStatus = (regisData?.status as keyof typeof STATUS_CONFIG) || 'pending'
    const config = STATUS_CONFIG[currentStatus]

    const approvalSteps = useMemo(() => {
        const createdAt = format(new Date(regisData.created_at), 'yyyy.MM.dd', { locale: ko })
        const updatedAt = format(new Date(regisData.updated_at), 'yyyy.MM.dd', { locale: ko })

        return [
            {
                title: "가입 및 신청",
                desc: `${createdAt} 완료됨`,
                done: true,
                active: false
            },
            {
                title: "서류 제출",
                desc: `${updatedAt} 제출`,
                done: !!regisData.biz_reg_image_url,
                active: !regisData.biz_reg_image_url
            },
            {
                title: "관리자 검토",
                desc: currentStatus === 'PENDING' ? "현재 서류 확인 중" : (currentStatus === 'APPROVED' ? "검토 완료" : "반려됨"),
                done: currentStatus === 'APPROVED',
                active: currentStatus === 'PENDING' || currentStatus === 'REJECTED'
            },
            {
                title: "최종 승인",
                desc: currentStatus === 'APPROVED' ? `${updatedAt} 승인됨` : "대기 중",
                done: currentStatus === 'APPROVED',
                active: false
            },
        ]
    }, [regisData, currentStatus])

    const documents = useMemo(() => {
        if (!regisData.biz_reg_image_url) return []

        const fileName = regisData.biz_reg_image_url.split('/').pop() || 'licence-image.jpg'

        return [{
            name: fileName,
            date: format(new Date(regisData.updated_at), 'yyyy.MM.dd'),
            status: currentStatus === 'APPROVED' ? 'APPROVED' : 'PENDING',
            label: '사업자 등록증',
            url: regisData.biz_reg_image_url
        }]
    }, [regisData, currentStatus])




    return (
        <>
            <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:block">{config.icon}</div>
                        <div>
                            <h1 className="text-lg font-bold text-gray-900">매장 승인 상태</h1>
                            <p className="text-sm text-gray-500">{config.title}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Badge status={config.color} text={config.label} className="mr-1! font-medium!" />
                        <Button
                            type="default"
                            shape="round"
                            onClick={() => setIsModalOpen(true)}
                            className="border-gray-200! font-medium! hover:text-emerald-500! hover:border-emerald-500! transition-all!"
                        >
                            상세보기
                        </Button>
                    </div>
                </div>
            </section>


            <Modal
                title={
                    <div className="pb-2">
                        <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Approval Hub</p>
                        <h2 className="text-xl font-bold text-gray-900">승인 및 서류 상세</h2>
                    </div>
                }
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={[
                    // TODO 여기서 전체 재제출을 할지 아니면 없앨지 보기 
                    <Button key="re-submit" icon={<UploadCloud size={16} />} className="h-11! rounded-xl! border-orange-200! text-orange-500! font-bold!">
                        서류 전체 재 제출
                    </Button>,
                    <Button key="close" type="primary" onClick={() => setIsModalOpen(false)} className="h-11! px-5! rounded-xl! bg-emerald-500! hover:bg-emerald-700! font-bold!">
                        확인
                    </Button>
                ]}
                width={520}
                centered
            >
                <div className="py-4 space-y-8">

                    <div className="rounded-3xl bg-gray-50/50 border border-gray-100 p-6 space-y-6">
                        {approvalSteps.map((step, id) => (
                            <div key={id} className="relative">
                                {id !== approvalSteps.length - 1 && (
                                    <div className="absolute left-2 top-6 h-9 w-0.5 bg-slate-100" />
                                )}
                                <StepStatus {...step} />
                            </div>
                        ))}
                    </div>

                    <Divider />

                    {/* //* 체출서류 목록 */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                                제출한 서류 목록
                            </h3>
                            <span className="text-[11px] text-gray-400 font-medium">총 1건 제출됨</span>
                        </div>

                        <div className="space-y-3">
                            {documents.length > 0 ? (
                                documents.map((doc, idx) => (
                                    <div key={idx} className="flex items-center justify-between rounded-2xl border border-gray-50 bg-gray-50/50 p-4 transition-hover hover:bg-gray-50">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                                                <FileText size={20} className="text-gray-400" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm font-bold text-gray-800">{doc.label}</p>
                                                    <Tag color={doc.status === 'APPROVED' ? 'success' : 'warning'} className="m-0 text-[10px] py-0 px-1.5 border-none font-bold">
                                                        {doc.status === 'APPROVED' ? '승인' : '검토 중'}
                                                    </Tag>
                                                </div>
                                                <p className="text-[11px] text-gray-400 mt-0.5 truncate">{doc.date} 제출</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <Button type="text" size="small" className="font-bold! hover:bg-orange-50!" onClick={() => window.open(doc.url, '_blank')}>보기</Button>
                                            <Divider type="vertical" />
                                            <Tooltip title="다운로드">
                                                <Button type="text" size="small" icon={<Download size={14} className="text-gray-400" />} onClick={() => window.open(doc.url, '_blank')} />
                                            </Tooltip>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-6 border-2 border-dashed border-gray-100 rounded-2xl text-gray-400 text-xs">
                                    제출된 서류가 없습니다.
                                </div>
                            )}
                        </div>
                    </section>

                    {/* //* 도움말 */}
                    <div className="mt-8 flex items-start gap-2 rounded-2xl bg-blue-50/50 p-4 border border-blue-100/30">
                        <AlertCircle size={14} className="mt-0.5 text-blue-500" />
                        <p className="text-[11px] leading-5 text-blue-700 font-medium">
                            승인 절차에 대해 궁금한 점이 있으신가요? <br />
                            {/* //TODO 관리자 문의하기하면 관리자 문의 하기 모달 띄우기 */}
                            <span className="underline cursor-pointer">관리자 문의하기</span>를 통해 빠르게 도움을 받으실 수 있습니다.
                        </p>
                    </div>
                </div>
            </Modal>
        </>
    )
}