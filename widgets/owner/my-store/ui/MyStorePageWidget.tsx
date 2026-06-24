'use client'

import { Clock, ShoppingBag, Megaphone, Headphones, Monitor } from "lucide-react";
import { useState } from "react";
import { useGetRegisData } from "@/entities/owner/my-shop/model";
import { useUserStore } from "@/entities/user/model";
import { useRestrictedAction } from "@/features/owner/my-store/lib";
import { MenuItem } from "@/shared/ui";
import { MyPageFooter } from "@/widgets/mypage/ui";
import { MyStoreHeader } from "@/widgets/owner/my-store/ui";
import { useShopStatus } from "@/features/owner/my-store/model";
import { StoreTimeBottomSheet, NoticeBottomSheet, InquiryBottomSheet } from "@/features/owner/my-store/ui";
import { ProductManageBottomSheet } from "@/features/owner/my-store/product/ui";
import { KioskSettingBottomSheet } from "@/features/owner/kiosk/ui";
import { useOwnerStoreStatus, useGetShopInfo } from "@/entities/owner/model";
import { useGetInquiryUserNoti } from "@/entities/inquiry/model";


export function MyStorePageWidget() {
    const [activeDrawer, setActiveDrawer] = useState<null | string>(null)

    const profile = useUserStore(state => state.profile)
    console.log('profile', profile) 

    // * 매장 승인 상태 
    const isVerified = useOwnerStoreStatus(state => state.isVerified)

    const { data: shopInfo } = useGetShopInfo()
    const shopId = shopInfo?.id

    const { data: regisData, isPending: isRegisPending } = useGetRegisData()


    // *현재 매장 운영여부
    const shopStatus = useShopStatus(shopId)


    const { handleAction, contextHolder } = useRestrictedAction(regisData?.status)

    const { data: userNoti = [] } = useGetInquiryUserNoti(profile?.id ?? '')
    const hasUnreadInquiry = userNoti.some(noti => !noti.is_read)

    if (isRegisPending) {
        return (
            <div className="p-6 space-y-6">
                <div className="animate-pulse bg-gray-100 rounded-3xl h-32 w-full" />
                <div className="animate-pulse bg-gray-100 rounded-2xl h-20 w-full" />
                <div className="animate-pulse bg-gray-100 rounded-2xl h-20 w-full" />
                <div className="animate-pulse bg-gray-100 rounded-2xl h-20 w-full" />
                <div className="animate-pulse bg-gray-100 rounded-2xl h-20 w-full" />
            </div>
        )
    }

    if (!regisData) {
        return null
    }


    return (
        <>
            {contextHolder}
            <div className="min-h-screen pb-12">
                <div className="mx-auto flex flex-col gap-8">

                    <MyStoreHeader regisData={regisData} isVerified={isVerified} shopId={shopId} />

                    <div className="grid grid-cols-1 gap-8 p-6">

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
                                            status={shopStatus.status}
                                            isVerified={isVerified}
                                        />
                                    </div>

                                    <div className="group">
                                        <MenuItem
                                            icon={<ShoppingBag className="w-5 h-5 text-rose-500" />} title="가게 상품 관리"
                                            onClick={() => handleAction(() => setActiveDrawer('product'))}
                                            isVerified={isVerified}
                                        />
                                    </div>

                                    <div className="group">
                                        <MenuItem
                                            icon={<Monitor className="w-5 h-5 text-emerald-500" />}
                                            title="키오스크 모드 설정"
                                            onClick={() => handleAction(() => setActiveDrawer('kiosk'))}
                                            // * 설정됐냐 안됐냐에 따라 나오게
                                            isVerified={isVerified}
                                        />
                                    </div>

                                    <div className="group">

                                        <MenuItem
                                            icon={<Megaphone className="w-5 h-5 text-blue-500" />} title="가게 공지 사항"
                                            onClick={() => {
                                                handleAction(() => setActiveDrawer('notice'))
                                            }}
                                            isVerified={isVerified}
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
                                        onClick={() => {
                                            handleAction(() => setActiveDrawer('inquiry'))
                                        }}
                                        status={hasUnreadInquiry ? 'new' : undefined}
                                        isVerified={isVerified}
                                    />
                                </div>


                                {/* //TODO  FAQ만들어 놓기 */}
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
                open={activeDrawer === 'product'}
                onClose={() => setActiveDrawer(null)}
                shopId={shopId}
            />
            <KioskSettingBottomSheet
                open={activeDrawer === 'kiosk'}
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
                open={activeDrawer === 'inquiry'}
                onClose={() => setActiveDrawer(null)}
            />

        </>
    )
}
