'use client'

import { CurrentLogItem } from "@/entities/owner/ui/CurrentLogItem"
import { Empty, Input, Select, Typography } from "antd"
import { useMemo, useState } from "react"
import { CurrentUsageLog } from "@/entities/check-in/model/types"
import { format, isToday, parseISO } from "date-fns"
import { CurrentLogSkeleton } from "./CurrentLogSkeleton"
import { CurrentLogDetailModal } from "@/entities/owner/ui/CurrentLogDetailModal"
import { useGetProductCategories } from "@/features/owner/my-store/product/model/useGetProductCategories"
import { useGetShopInfo } from "@/entities/owner/model/useGetShopInfo"
import { ko } from "date-fns/locale"

interface FinishedLogListProps {
    data: CurrentUsageLog[];
    isPending: boolean
}

export function FinishedLogList({ data, isPending }: FinishedLogListProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [filterType, setFilterType] = useState('all')
    const [detailItem, setDetailItem] = useState<CurrentUsageLog | null>(null)

    const {data: shopInfo} = useGetShopInfo()
    const shopId = shopInfo.id
    

    // * 상품 카테고리 가져오기
    const { data: categories} = useGetProductCategories(shopId)

    const categoryOptions = [
    { value: 'all', label: '전체 유형' }, 
    ...(categories?.map(c => ({
        value: c.id,   
        label: c.name  
    })) || [])
]


    const filteredData = useMemo(() => {
        return data.filter(item => {
            const matchesSearch =
                item.dog?.name.includes(searchQuery) ||
                item.owner?.name.includes(searchQuery)
            const matchedType = filterType === 'all' || item.product?.category?.id === filterType
            return matchesSearch && matchedType
        })
    }, [data, searchQuery, filterType])



    const groupedData = useMemo(() => {
        const group: Record<string, CurrentUsageLog[]> = {}
        filteredData.forEach(item => {
            const date = format(item.created_at, 'yyyy-MM-dd')
            if (!group[date]) group[date] = []
            group[date].push(item)
        })
        return group
    }, [filteredData])



    if (isPending) return <CurrentLogSkeleton />

    return (
        <>
            <div className="flex flex-col h-full gap-4">
                <div className="flex gap-2 sticky top-0 bg-white z-10 pb-2">
                    <Input.Search
                        placeholder="강아지 또는 보호자 이름"
                        onSearch={setSearchQuery}
                        className="flex-1"
                        allowClear
                    />
                    <Select
                        defaultValue="all"
                        onChange={(value) => setFilterType(value)}
                        options={categoryOptions}
                        className="w-32"
                    />
                </div>

                <div className="flex-1 overflow-y-auto px-1">
                    {Object.keys(groupedData).length === 0 ? (
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="데이터가 없습니다." />
                    ) : (
                        Object.entries(groupedData).sort((a, b) => b[0].localeCompare(a[0])).map(([date, logs]) => {
                            const dateObj = parseISO(date)
                            const dateDisplay = isToday(dateObj)
                                ? `${format(dateObj, 'yyyy-MM-dd(eee)', { locale: ko })} (오늘)`
                                : format(dateObj, 'yyyy-MM-dd(eee)', { locale: ko })

                            return (
                                <div key={date} className="mb-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="h-4 w-1 bg-blue-500 rounded-full" />
                                        <Typography.Title level={5} style={{ margin: 0 }}>
                                            {dateDisplay}
                                        </Typography.Title>
                                        <Typography.Text type="secondary" className="text-xs">
                                            {logs.length}건
                                        </Typography.Text>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        {logs.map(item => (
                                            <CurrentLogItem
                                                key={item.id}
                                                item={item}
                                                onClick={() => setDetailItem(item)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
            </div>

            <CurrentLogDetailModal open={!!detailItem} item={detailItem} onClose={() => setDetailItem(null)}
            />

        </>
    )
}