'use client'

import { useGetShopInfo } from "@/entities/owner/model/useGetShopInfo"
import { StoreTimeCard } from "@/features/owner/my-store/ui/StoreTimeCard"
import { BottomSheet } from "@/shared/ui/place/BottomSheet"
import { Skeleton } from "antd"





export function StoreTimeBottomSheet({ open, onClose }: { open: boolean, onClose: () => void }) {
    const { data: shopInfo, isPending: isShopPending } = useGetShopInfo()
            const shopId = shopInfo?.id
    
    return (
        <BottomSheet isOpen={open} onClose={onClose}>

            {isShopPending ? (
                <div className="space-y-4 p-4">
                    <Skeleton.Button active block style={{ height: 40 }} />
                    <Skeleton active paragraph={{ rows: 3 }} />
                </div>
            ) : shopId ? (
                <div className="h-full pb-10">
                    <StoreTimeCard shopId={shopId} />
                </div>
            ) : (
                <div className="p-8 text-center text-gray-400 text-sm">
                    매장 정보를 불러올 수 없습니다.
                </div>
            )}

        </BottomSheet>
    )
}