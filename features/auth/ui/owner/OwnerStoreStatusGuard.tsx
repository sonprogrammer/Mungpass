'use client'

import { useOwnerStoreStatus } from "@/entities/owner/model/useOwnerStoreStatus"
import { useUserStore } from "@/entities/user/model/useUserStore"
import { useGetOwnerHasStoreStatus } from "@/features/owner/model/useGetOwnerHasStoreStatus"
import { LoadingToStoreRegister } from "@/features/owner/ui/LoadingToStoreRegister"
import { ShopOutlined } from "@ant-design/icons"
import { App, Button, Modal } from "antd"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

export function OwnerStoreStatusGuard({ children }: { children: React.ReactNode }) {
    const profile = useUserStore(state => state.profile)
    const ownerId = profile?.id
    const router = useRouter()
    const pathname = usePathname()

    const { message } = App.useApp()

    const { data: storeStatusInfo, isPending } = useGetOwnerHasStoreStatus()
    const setIsVerified = useOwnerStoreStatus(state => state.setIsVerified)
    const isVerified = useOwnerStoreStatus(state => state.isVerified)

    const isAtRegisterPage = pathname.includes('/signup/owner/store')



    useEffect(() => {
        if (!profile || isPending) return

        if (storeStatusInfo) {

            const { status, origin } = storeStatusInfo
            const isPendingApproval = origin === 'store_registrations'
            const currentVerifiedStatus = origin === 'shops'



            // * 심사중일때
            if (isPendingApproval && status === 'pending' && !isVerified) {
                message.destroy()
                message.warning({
                    content: '심사 완료 후 기능을 이용할 수 있습니다',
                    key: 'pending-msg',
                    duration: 3
                })
            }

            if (status === 'rejected') {
                message.destroy()
                message.error({
                    content: '매장 승인이 거절되었습니다. 상세보기에서 사유를 확인해주세요',
                    key: 'rejected-msg',
                    duration: 3
                })
                if (isVerified) setIsVerified(false)
            }

            // * shops테이블에 들어가면 isVerified를 true로 설정
            if (isVerified !== currentVerifiedStatus) {
                setIsVerified(currentVerifiedStatus)
            }
        }


    }, [storeStatusInfo, isPending, ownerId, router, profile, isVerified, message, setIsVerified])

    if (!profile || (isPending && !storeStatusInfo)) {
        return <LoadingToStoreRegister storeStatusInfo={storeStatusInfo} isPending={isPending} />
    }

    if (!storeStatusInfo && !isAtRegisterPage) {
        return (
            <>
                <div className="w-full h-full pointer-events-none select-none filter blur-xs opacity-40">
                    {children}
                </div>
                <Modal
                    title={
                        <div className="flex items-center gap-2 text-lg font-black text-slate-800">
                            <ShopOutlined className="text-emerald-500" />
                            <span>매장 등록 안내</span>
                        </div>}
                    open={!storeStatusInfo}
                    closable={false}
                    maskClosable={false}
                    footer={[
                        <Button
                            key='submit'
                            type="primary"
                            size="large"
                            className="w-full bg-emerald-500! hover:bg-emerald-600! font-bold! rounded-xl!"
                            onClick={() => {
                                router.replace(`/signup/owner/store?ownerId=${ownerId}`)
                            }}
                        >
                            매장 등록하기
                        </Button>
                    ]}
                    centered
                >
                    <div className="py-4 space-y-2 flex flex-col items-center">
                        <h1 className="text-lg font-bold text-slate-700">파트너님, 아직 등록된 매장이 없습니다.</h1>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            반려인들이 파트너님의 매장을 찾고 이용할 수 있도록 <br />
                            먼저 매장 정보를 등록하고 심사를 신청해 주세요!<br />
                            사장님 인터페이스는 매장 등록 후 확인 가능합니다.
                        </p>
                    </div>

                </Modal>
            </>
        )
    }
    return <>{children}</>
}