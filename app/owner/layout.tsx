'use client'

import { useOwnerStoreStatus } from '@/entities/owner/model/useOwnerStoreStatus';
import { useUserStore } from '@/entities/user/model/useUserStore';
import { useGetOwnerHasStoreStatus } from '@/features/owner/model/useGetOwnerHasStoreStatus';
import { LoadingToStoreRegister } from '@/features/owner/ui/LoadingToStoreRegister';
import OwnerHeader from '@/widgets/header/ui/OwnerHeader';
import { OwnerNavbar } from '@/widgets/owner/ui/OwnerNavbar';
import { App, ConfigProvider } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'


export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  const profile = useUserStore(state => state.profile)
  const ownerId = profile?.id
  const router = useRouter()

  const { data: storeStatusInfo, isPending } = useGetOwnerHasStoreStatus()
  const setIsVerified = useOwnerStoreStatus(state => state.setIsVerified)
  const isVerified = useOwnerStoreStatus(state => state.isVerified)

  const { message } = App.useApp()

  useEffect(() => {
    if (!profile || isPending || !storeStatusInfo) return

    const { status, origin } = storeStatusInfo
    const isPendingApproval = origin === 'store_registrations'
    const currentVerifiedStatus = origin === 'shops'


    // * 심사 중일 때 메시지 띄우기
    if (isPendingApproval && status === 'pending' && !isVerified) {
      message.destroy()
      message.warning({
        content:'심사 완료 후 기능을 이용할 수 있습니다',
        key: 'pending-msg',
        duration: 3
      })
    }

    if(status === 'rejected'){
      message.destroy()
      message.error({
        content: '매장 승인이 거절되었습니다. 상세보기에서 사유를확인해주세요.',
        key:'rejected-msg',
        duration: 5
      })
      if(isVerified) setIsVerified(false)
    }


    if (isVerified !== currentVerifiedStatus) {
      setIsVerified(currentVerifiedStatus)
    }

    if (!storeStatusInfo) {
      router.replace(`/signup/owner/store?ownerId=${ownerId}`);
    }
  }, [storeStatusInfo, isPending, ownerId, router, profile, isVerified, message, setIsVerified])

  if (!profile || (isPending && !storeStatusInfo)) {
    return (
      <LoadingToStoreRegister storeStatusInfo={storeStatusInfo} isPending={isPending} />
    )
  }


  return (
    <ConfigProvider>
      <App>
        <div className="flex justify-center bg-slate-200 h-screen">
          <div className="w-full max-w-120 bg-white h-screen flex flex-col relative shadow-2xl">
            <OwnerHeader />

            <main className={`flex-1 bg-[#fafafa] overflow-y-auto `}>
              {/* TODO 여기도 블러처리할지 아님 그냥기능만 차단할지 */}
              {/* <div className={isPendingApproval ? "filter blur-[2px] pointer-events-none select-none opacity-70" : "h-full"}> */}
              <div className='h-full'>
                {children}
              </div>

              {/* TODO 모달을 띄울지 아님 그냥 기능 차단만 할지 */}
              {/* {isPendingApproval && !isPending && (
                <StorePendingModal />
              )} */}
            </main>

            <div className="bg-[#fafafa] w-full shrink-0">
              <OwnerNavbar />
            </div>

          </div>
        </div>
      </App>
    </ConfigProvider>
  )
}