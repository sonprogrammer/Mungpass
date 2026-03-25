'use client'

import { useUserStore } from "@/entities/user/model/useUserStore";
import { InquiryBottomSheet } from "@/features/owner/my-store/ui/InquiryBottomSheet";
import { NoticeBottomSheet } from "@/features/owner/my-store/ui/NoticeBottomSheet";

import { ProductManageBottomSheet } from "@/features/owner/my-store/ui/ProductManageBottomSheet";
import { StoreTimeBottomSheet } from "@/features/owner/my-store/ui/StoreTimeBottomSheet";
import { MenuItem } from "@/shared/ui/MenuItem";
import { MyPageFooter } from "@/widgets/mypage/ui/MyPageFooter";
import { MyStoreHeader } from "@/widgets/owner/my-store/ui/MyStoreHeader";

import { Clock, ShoppingBag, Megaphone, Headphones } from "lucide-react";
import { useState } from "react";

export default function MyStorePage() {
    const [activeDrawer, setActiveDrawer] = useState<null | string>(null)
    const profile = useUserStore(state => state.profile)

    return (
        <>
        <div className="min-h-screen pb-12 p-6">
            <div className="mx-auto flex flex-col gap-8">

                <MyStoreHeader />

                {/* //TODO 아래 이용은 매장 승인 완료 후 이용 가능하다고 하고 클릭 막아놓기 */}

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
                                        onClick={() => setActiveDrawer('time')}
                                        // TODO 현재 영업상황에 따라 변경
                                        status="현재 영업 중"
                                    />
                                </div>
                                <div className="group">

                                    <MenuItem
                                        icon={<ShoppingBag className="w-5 h-5 text-rose-500" />} title="가게 상품 관리"
                                        onClick={() => setActiveDrawer('product')}
                                        // TODO 현재 공지사항에 따라 변경 아님 삭제 하던가
                                        status="new"
                                    />
                                </div>
                                <div className="group">

                                    <MenuItem
                                        icon={<Megaphone className="w-5 h-5 text-blue-500" />} title="가게 공지 사항"
                                        onClick={() => setActiveDrawer('notice')}
                                        // TODO 현재 공지사항에 따라 변경 아님 삭제 하던가
                                        status="new"
                                    />
                                </div>

                                {/* <StoreInquiryCard /> */}
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
