'use client'

import { Modal, Badge, Button, Divider, App } from 'antd'
import { useMemo, useState } from 'react'
import { CheckCircleFilled, ClockCircleFilled, CloseCircleFilled } from '@ant-design/icons'
import { AlertCircle } from 'lucide-react';
import { StepStatus } from '@/features/auth/ui/owner/StepStatus';

import { format, isSameMonth, isToday } from 'date-fns';
import { ko } from 'date-fns/locale'
import { MyStoreHeaderProps } from '@/entities/owner/my-shop/model/types';
import { useGetDailySalesData } from '@/entities/owner/model/useGetDailySalesData';
import { useGetMonthlySalesData } from '@/entities/owner/model/useGetMonthlySalesData';
import { RegisteredStoreInfo } from '@/entities/owner/my-shop/ui/RegisteredStoreInfo';
import { RegistrationDoc } from '@/entities/owner/my-shop/ui/RegistrationDoc';
import { getAdminUrl } from '@/features/admin/store/api/ownerDocs';
import NextImage from 'next/image';
import { useRouter } from 'next/navigation';

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

export function MyStoreHeader({ shopId, regisData, isVerified }: MyStoreHeaderProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    const thisMonth = format(new Date(), 'yyyy-MM') //오늘 매출 데이터를 가져오기 위함
    const router = useRouter()

    // * 오늘 매출 데이터 가져오기 -> 여기서 데이터는 [{date: '2026-05-01', sales: 10000, visits: 3},,,]이런식으로 나ㅁ오
    const { data: dailySalesData = [], isPending: isDailyPending } = useGetDailySalesData(shopId, thisMonth)
    // * 월 누적 데이터를 가져오기 위함 -> 데이터 [{month: '2026-05', sales: 10000, visits: 3},,,]이런식으로 나옴
    const { data: monthlySalesData = [], isPending: isMonthlyPending } = useGetMonthlySalesData(shopId)

    const isLoading = !shopId || isDailyPending || isMonthlyPending

    const { message } = App.useApp()


    //* 오늘 매출 가져오기 
    // * 요번달 누적 데이터만 가져오기
    const { todaySales, accSales } = useMemo(() => {
        if (isLoading) return { todaySales: 0, accSales: 0 };

        const todayTotal = dailySalesData
            .filter(d => isToday(new Date(d.date)))
            .reduce((acc, cur) => acc + cur.sales, 0);

        const monthlyTotal = monthlySalesData
            .filter(m => isSameMonth(new Date(m.month), new Date()))
            .reduce((acc, cur) => acc + cur.sales, 0);

        return { todaySales: todayTotal, accSales: monthlyTotal };
    }, [dailySalesData, monthlySalesData, isLoading])

    const currentStatus = (regisData?.status as keyof typeof STATUS_CONFIG) || 'pending'
    const config = STATUS_CONFIG[currentStatus]

    const approvalSteps = useMemo(() => {
        const createdAt = format(new Date(regisData.created_at), 'yyyy.MM.dd', { locale: ko })
        const submittedAt = format(new Date(regisData.submitted_at), 'yyyy.MM.dd', { locale: ko })
        const rejectedAt = format(new Date(regisData.rejected_at), 'yyyy.MM.dd', { locale: ko })
        const approvedAt = format(new Date(regisData.approved_at), 'yyyy.MM.dd', { locale: ko })


        return [
            {
                title: "가입 및 신청",
                desc: `${createdAt} 완료됨`,
                done: true,
                active: false
            },
            {
                title: "서류 제출",
                desc: `${submittedAt} 제출`,
                done: !!regisData.biz_reg_image_url,
                active: !regisData.biz_reg_image_url
            },
            {
                title: "관리자 검토",
                desc: currentStatus === 'PENDING' ? "현재 서류 확인 중" : currentStatus === 'APPROVED' ? "검토 완료" : `${rejectedAt} 반려됨`,
                done: currentStatus === 'APPROVED',
                active: currentStatus === 'PENDING' || currentStatus === 'REJECTED',
                error: currentStatus === 'REJECTED'
            },
            {
                title: "최종 승인",
                desc: currentStatus === 'APPROVED' ? `${approvedAt} 승인됨` : "대기 중",
                done: currentStatus === 'APPROVED',
                active: false
            },
        ]
    }, [regisData, currentStatus])

    const handleReSubmit = () => {
        router.push(`/signup/owner/re-store`)
    }


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
        <div className='px-6 pt-6'>
            {currentStatus !== 'APPROVED' ?
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
                            {isVerified && isLoading ? (
                                <div className="h-6 w-16 animate-pulse bg-gray-100 rounded-full" />
                            ) : (
                                <Badge status={config.color} text={config.label} className="mr-1! font-medium!" />
                            )}
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
                :

                <RegisteredStoreInfo storeName={regisData.store_name} status={config.label} todaySales={todaySales} accSales={accSales} onDetailClick={() => setIsModalOpen(true)}
                    isLoading={isLoading}
                />
            }

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
                    currentStatus === 'REJECTED' && (
                        <Button
                            key='submit'
                            type='primary'
                            onClick={handleReSubmit}
                            className='h-11! px-5! rounded-xl! bg-red-400! hover:bg-red-600! font-bold!'
                        >
                            재 제출
                        </Button>
                    ),
                    <Button
                        key="close"
                        type="primary"
                        onClick={() => setIsModalOpen(false)}
                        className="h-11! px-5! rounded-xl! bg-emerald-500! hover:bg-emerald-700! font-bold!"
                    >
                        확인
                    </Button>
                ]}
                width={500}
                centered
            >
                <div className="overflow-y-auto py-4 space-y-8" style={{ maxHeight: 'calc(100vh - 300px)' }}>

                    <div className="rounded-3xl bg-gray-50/50 border border-gray-100 p-6 space-y-6">
                        {approvalSteps.map((step, id) => (
                            <div key={id} className="relative">
                                {id !== approvalSteps.length - 1 && (
                                    <div className="absolute left-2 top-6 h-9 w-0.5 bg-slate-100" />
                                )}
                                <StepStatus key={id} title={step.title} desc={step.desc} done={step.done} active={step.active} isError={step.error} />
                            </div>
                        ))}
                    </div>

                    {currentStatus === 'REJECTED' && (
                        <div className="mb-8 overflow-hidden rounded-2xl border border-rose-100 bg-rose-50/30">
                            <div className="flex items-center gap-2 bg-rose-50 px-4 py-2.5">
                                <AlertCircle size={16} className="text-rose-500" />
                                <h3 className="text-sm font-bold text-rose-700">매장 승인 반려 사유</h3>
                            </div>
                            <div className="p-4">
                                <p className="text-[13px] leading-relaxed text-gray-700 font-medium">
                                    {regisData?.rejection_reason || "반려 사유가 등록되지 않았습니다. 관리자에게 문의해주세요."}
                                </p>
                                <div className="mt-3 flex justify-end">
                                    <span className="text-[11px] text-rose-400 font-medium">
                                        * 내용을 수정하여 재신청해주시기 바랍니다.
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

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

                        <RegistrationDoc regisData={regisData} currentStatus={currentStatus} handleOpenDocs={handleOpenDocs} />
                    </section>

                    {/* //* 도움말 */}
                    <div className="mt-8 flex items-start gap-2 rounded-2xl bg-blue-50/50 p-4 border border-blue-100/30">
                        <AlertCircle size={14} className="mt-0.5 text-blue-500" />
                        <p className="text-[11px] leading-5 text-blue-700 font-medium">
                            승인 절차에 대해 궁금한 점이 있으신가요? <br />
                            {/* //TODO 관리자 문의하기하면 현재 모달 닫아지고 관리자 문의 하기 모달 띄우기 */}
                            <span className="underline cursor-pointer">관리자 문의하기</span>를 통해 빠르게 도움을 받으실 수 있습니다.
                        </p>
                    </div>
                </div>
            </Modal>

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
                        <div className="relative w-full aspect-3/4 min-h-[300px]">
                            <NextImage
                                src={previewUrl}
                                alt='사업자 등록증 미리보기'
                                fill
                                className="object-contain"
                                sizes="(max-width: 480px) 100vw, 700px"
                                onContextMenu={(e) => e.preventDefault()}
                                draggable={false}
                                priority
                            />
                        </div>
                    )
                )}

            </Modal>

        </div>
    )
}