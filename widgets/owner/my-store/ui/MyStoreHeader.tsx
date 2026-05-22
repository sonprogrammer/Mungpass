'use client'

import { Modal, Badge, Button, Divider, App } from 'antd'
import { useMemo, useState } from 'react'
import { CheckCircleFilled, ClockCircleFilled, CloseCircleFilled } from '@ant-design/icons'
import { AlertCircle } from 'lucide-react';
import { isSameMonth } from 'date-fns';
import { MyStoreHeaderProps } from '@/entities/owner/my-shop/model/types';
import { useGetMonthlySalesData } from '@/entities/owner/model/useGetMonthlySalesData';
import { RegisteredStoreInfo } from '@/features/owner/my-store/ui/RegisteredStoreInfo';
import { RegistrationDoc } from '@/features/owner/my-store/ui/RegistrationDoc';
import { getAdminUrl } from '@/features/admin/store/api/ownerDocs';
import { useRouter } from 'next/navigation';
import { useGetExpectedSales } from '@/entities/owner/model/useGetExpectedSales';
import { useGetTodayConfirmedSales } from '@/entities/check-in/model/useGetTodayConfirmedSales';
import { StoreApprovalTimeline } from '@/widgets/owner/my-store/ui/StoreApprovalTimeline';
import { StoreDocPreviewModal } from '@/widgets/owner/my-store/ui/StoreDocPreviewModal';

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

    const router = useRouter()


    // * 오늘 매출 - 체크인시 우선적으로 그 상품 가격이 나오고 상품시간초과시 유예시간 적용후 초과시간 만큼 계산된 매출이 계산되어 정산
      const { data: expectedSales, isPending: isExpectedSalesPending } = useGetExpectedSales(shopId)
    
    // * 월 누적 데이터를 가져오기 위함 -> 데이터 [{month: '2026-05', sales: 10000, visits: 3},,,]이런식으로 나옴
    const { data: monthlySalesData = [], isPending: isMonthlyPending } = useGetMonthlySalesData(shopId)

    // * 오늘 확정 매출 
    const { data : todayConfirmed =0 } = useGetTodayConfirmedSales(shopId)


    const isLoading = !shopId || isExpectedSalesPending || isMonthlyPending

    const { message } = App.useApp()


    // * 요번달 누적 매출 가져오기 - 체크아웃 한 매출(확정매출) + 체크아웃 하지 않은 예상매출(오버타임 할시 추가금 발생하는 매출)
    const { accSales } = useMemo(() => {
        if (isLoading) return { todaySales: 0, accSales: 0 };

        const monthlyTotal = monthlySalesData
            .filter(m => isSameMonth(new Date(m.month), new Date()))
            .reduce((acc, cur) => acc + cur.sales, 0);

        const realTimeAccSales = monthlyTotal - todayConfirmed + expectedSales
        // * 매출 확정된 이번달 매출 - 오늘 확정된 체크아웃 매출 + 오늘 예상매출(오늘 확정된 체크아웃매출 + 아직 체크아웃하지 않은 매출)

        return {  accSales: realTimeAccSales };
    }, [isLoading, monthlySalesData, todayConfirmed, expectedSales])

    const currentStatus = (regisData?.status as keyof typeof STATUS_CONFIG) || 'PENDING'
    const config = STATUS_CONFIG[currentStatus]


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
        <div className=''>
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

                <RegisteredStoreInfo storeName={regisData.store_name} status={config.label} todaySales={expectedSales} accSales={accSales} onDetailClick={() => setIsModalOpen(true)}
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

                    {/* //* 매장 승인 여부 타임라인 */}
                    <StoreApprovalTimeline regisData={regisData} currentStatus={currentStatus}/>

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

            <StoreDocPreviewModal 
                previewUrl={previewUrl} 
                onClose={() => setPreviewUrl(null)}
            />

        </div>
    )
}