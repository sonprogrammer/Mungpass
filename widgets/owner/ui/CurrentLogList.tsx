'use client'

import { CurrentLogItem } from "@/entities/owner/ui/CurrentLogItem"
import { Empty } from "antd"
import { useState } from "react"

import { CurrentLogDetailModal } from "@/entities/owner/ui/CurrentLogDetailModal"
import { ConfirmModal } from "@/shared/ui/ConfirmModal"
import { CurrentUsageLog } from "@/entities/check-in/model/types"
import { usePostCheckout } from "@/features/qr/owner/model/usePostCheckout"
import { CurrentLogSkeleton } from "@/widgets/owner/ui/CurrentLogSkeleton"


export function CurrentLogList({ data, tab, isPending, isVerified }: {data: CurrentUsageLog[], tab: 'current' | 'checkout', isPending: boolean, isVerified: boolean}) {
    const [checkoutItem, setCheckoutItem] = useState<CurrentUsageLog | null>(null)
    const [detailItem, setDetailItem] = useState<CurrentUsageLog | null>(null)

    const { mutate: checkoutMutate} = usePostCheckout()
    
    // TODO 상품에 따라 정렬도 가능하게 하기
    
    
    
    const handleCheckout = (item: CurrentUsageLog) => {
        setCheckoutItem(item)
    }

    const handleConfirmCheckout = () =>{
        if(!checkoutItem) return
        checkoutMutate(checkoutItem.id)
        setCheckoutItem(null)
    }

    if(isPending){
        return(
            <CurrentLogSkeleton />
        )
    }
    

    if (data.length === 0) {
        return (
            <div>
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                            <span className="text-slate-400">
                                {!isVerified
                                    ? "매장 심사 승인 후 이용 내역이 표시됩니다."
                                    : "현재 이용 중인 반려견이 없습니다."}
                            </span>
                        }
                />
            </div>
        )
    }
    return (
        <>
            {/* //* tab이 체크아웃일시 */}
            {tab === 'checkout' && 
                <div>hi</div>
            }
            <div className="flex flex-col gap-2 h-full overflow-y-auto px-2">
                {data.map(item => (
                    <CurrentLogItem
                        key={item.id}
                        item={item}
                        onCheckout={handleCheckout}
                        onClick={setDetailItem}
                    />
                ))}
            </div>

            <ConfirmModal
                open={!!checkoutItem}
                title="퇴실 처리하시겠습니까?"
                description={
                    checkoutItem
                        ? `${checkoutItem.dog?.name}의 이용 상태를 퇴실로 변경합니다.`
                        : ''
                }
                confirmText="퇴실 처리"
                cancelText="취소"
                confirmDanger
                onConfirm={handleConfirmCheckout}
                onCancel={() => {
                    setCheckoutItem(null)
                }}
            />


            <CurrentLogDetailModal open={!!detailItem} item={detailItem} onClose={() => setDetailItem(null)}
                onCheckout={handleCheckout} />
        </>
    )
}