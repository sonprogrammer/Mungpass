'use client'

import { Badge, Button, App } from 'antd'
import { useMemo, useState } from 'react'
import { CheckCircleFilled, ClockCircleFilled, CloseCircleFilled } from '@ant-design/icons'
import { isSameMonth } from 'date-fns';
import { useRouter } from 'next/navigation';
import { MyStoreHeaderProps } from '@/entities/owner/my-shop/model';
import { useGetExpectedSales, useGetMonthlySalesData } from '@/entities/owner/model';
import { useGetTodayConfirmedSales } from '@/entities/check-in/model';
import { getAdminUrl } from '@/features/admin/store/api';
import { RegisteredStoreInfo } from '@/features/owner/my-store/ui';
import { StoreDetailStatusModal, StoreDocPreviewModal } from '@/widgets/owner/my-store/ui';


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
    const { data: expectedSale, isPending: isExpectedSalesPending } = useGetExpectedSales(shopId)
    const expectedSales = expectedSale ?? 0

    // * 월 누적 데이터를 가져오기 위함 -> 데이터 [{month: '2026-05', sales: 10000, visits: 3},,,]이런식으로 나옴
    const { data: monthlySalesData = [], isPending: isMonthlyPending } = useGetMonthlySalesData(shopId)

    // * 오늘 확정 매출 
    const { data: todayConfirmed = 0 } = useGetTodayConfirmedSales(shopId)


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

        return { accSales: realTimeAccSales };
    }, [isLoading, monthlySalesData, todayConfirmed, expectedSales])

    const currentStatus = (regisData?.status as keyof typeof STATUS_CONFIG) || 'PENDING'
    const config = STATUS_CONFIG[currentStatus]

    const storeName = regisData.store_name


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
                <section className="rounded-b-3xl bg-emerald-200 p-6 shadow-md">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:block">{config.icon}</div>
                            <div>
                                <h2 className="text-md font-medium text-gray-500">{storeName}</h2>
                                <p className="text-md font-bold text-gray-900">{config.title}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {isVerified && isLoading ? (
                                <div className="h-6 w-16 animate-pulse bg-gray-100 rounded-full" />
                            ) : (
                                <Badge status={config.color} text={config.label} className="mr-1! font-medium! " />
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
            <StoreDetailStatusModal
                storeName={storeName}
                onClose={() => setIsModalOpen(false)}
                isOpen={isModalOpen}
                currentStatus={currentStatus}
                regisData={regisData}
                handleOpenDocs={handleOpenDocs}
                handleReSubmit={handleReSubmit}
            />


            <StoreDocPreviewModal
                previewUrl={previewUrl}
                onClose={() => setPreviewUrl(null)}
            />

        </div>
    )
}