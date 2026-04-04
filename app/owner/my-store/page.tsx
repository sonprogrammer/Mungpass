'use client'

import { useGetRegisData } from "@/entities/owner/my-shop/model/useGetRegisData";
import { useUserStore } from "@/entities/user/model/useUserStore";
import { useRestrictedAction } from "@/features/owner/my-store/lib/useRestrictedAction";
import { StoreTimeBottomSheet } from '@/widgets/mypage/ui/StoreTimeBottomSheet'
import { InquiryBottomSheet } from '@/widgets/mypage/ui/InquiryBottomSheet'
import { NoticeBottomSheet } from '@/widgets/mypage/ui/NoticeBottomSheet'
import { ProductManageBottomSheet } from '@/widgets/mypage/ui/ProductManageBottomSheet'
import { MenuItem } from "@/shared/ui/MenuItem";
import { MyPageFooter } from "@/widgets/mypage/ui/MyPageFooter";
import { MyStoreHeader } from "@/widgets/owner/my-store/ui/MyStoreHeader";
import { Clock, ShoppingBag, Megaphone, Headphones } from "lucide-react";
import { useState } from "react";
import { useShopStatus } from "@/features/owner/my-store/model/useGetShopStatus";


export default function MyStorePage() {
    const [activeDrawer, setActiveDrawer] = useState<null | string>(null)
    // TODO 영업시간관리 카드에서 현재 영업중인지아닌지 표시
    const [storeStatus, setStoreStatus] = useState(false)
    const profile = useUserStore(state => state.profile)
    
    // * 매장 승인 신청정보(store_registratian table)
    const { data: regisData, isPending: isRegisPending} = useGetRegisData()
    
    console.log('regis', regisData)
    const shopId = regisData?.store_id
    // *현재 매장 운영여부
    const shopStatus = useShopStatus(shopId)
    console.log('shopstatus', shopStatus)
    
    
    const { handleAction, contextHolder} = useRestrictedAction(regisData?.status)

    if (isRegisPending) {
        return (
            <div className="p-6 space-y-6">
                <div className="animate-pulse bg-gray-100 rounded-3xl h-32 w-full" />
                <div className="animate-pulse bg-gray-100 rounded-2xl h-64 w-full" />
            </div>
        )
    }
    return (
        <>
        {contextHolder}
        <div className="min-h-screen pb-12 p-6">
            <div className="mx-auto flex flex-col gap-8">

                <MyStoreHeader regisData={regisData}/>

                <div className="grid grid-cols-1 gap-8">

                    <div className="flex flex-col gap-8">
                        <section>
                            <h3 className="mb-4 ml-1 text-sm font-bold text-gray-500 tracking-wider">
                                상점 운영 관리
                            </h3>
                            <div className="flex flex-col gap-2">
                                <div className="group">

                                    <MenuItem
                                        icon={<Clock className="w-5 h-5 text-orange-500 bg-orange-50!" />} title="영업 시간 관리"
                                        onClick={() => handleAction(() => setActiveDrawer('time'))}
                                        // TODO 현재 영업상황에 따라 변경
                                        status={shopStatus.status}
                                    />
                                </div>
                                <div className="group">

                                    <MenuItem
                                        icon={<ShoppingBag className="w-5 h-5 text-rose-500" />} title="가게 상품 관리"
                                        onClick={() => handleAction(() => setActiveDrawer('product'))}
                                        // TODO 현재 공지사항에 따라 변경 아님 삭제 하던가
                                        status="new"
                                    />
                                </div>
                                <div className="group">

                                    <MenuItem
                                        icon={<Megaphone className="w-5 h-5 text-blue-500" />} title="가게 공지 사항"
                                        onClick={() => handleAction(() =>setActiveDrawer('notice'))}
                                        // TODO 현재 공지사항에 따라 변경 아님 삭제 하던가
                                        status="new"
                                    />
                                </div>

                            </div>
                        </section>
                    </div>


                    <section>
                        <h3 className="mb-4 ml-1 text-sm font-bold text-gray-500 tracking-wider">
                            고객 센터 및 지원
                        </h3>
                        <div className="flex flex-col gap-2">
                            <div className="group">

                                <MenuItem
                                    icon={<Headphones className="w-5 h-5 text-orange-500" />} title="관리자 문의"
                                    onClick={() => setActiveDrawer('inquiry')}
                                    // TODO 문의자가 답변한 내용이 있으면 New로
                                    status="new"
                                />
                            </div>


                            {/* //TODO 나중에 대강 완료하고 FAQ만들어 놓기 */}
                        </div>
                    </section>

                    <div>
                        <MyPageFooter user={profile} />
                    </div>

                </div>
            </div>
        </div>
        
        {/* //* 가게 영엄 시간  */}
         <StoreTimeBottomSheet
            open={activeDrawer === 'time'}
            onClose={() => setActiveDrawer(null)}
         />
         {/* //* 가게 상품 관리 */}
         <ProductManageBottomSheet 
            isOpen={activeDrawer === 'product'}
            onClose={() => setActiveDrawer(null)}
            shopId={shopId}
         />
         {/* //* 가게 공지 사항 */}
         <NoticeBottomSheet 
            open={activeDrawer === 'notice'}
            onClose={() => setActiveDrawer(null)}
         />
        {/* //* 관리자 문의 */}
        <InquiryBottomSheet
            isOpen={activeDrawer === 'inquiry'}
            onClose={() => setActiveDrawer(null)}
        />

        </>
    )
}
