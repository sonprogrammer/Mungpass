'use client'

import { useOwnerStoreStatus } from '@/entities/owner/model/useOwnerStoreStatus';
import { useUserStore } from '@/entities/user/model/useUserStore';
import { useGetOwnerHasStoreStatus } from '@/features/owner/model/useGetOwnerHasStoreStatus';
import { LoadingToStoreRegister } from '@/features/owner/ui/LoadingToStoreRegister';
import OwnerHeader from '@/widgets/header/ui/OwnerHeader';
import { OwnerNavbar } from '@/widgets/owner/ui/OwnerNavbar';
import { StorePendingModal } from '@/widgets/owner/ui/StorePendingModal';
import { App, ConfigProvider } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'


export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  const profile = useUserStore(state => state.profile)
  const ownerId = profile?.id
  const router = useRouter()

  const { data: storeStatusInfo, isPending} = useGetOwnerHasStoreStatus(ownerId || '')
  const setIsVerified = useOwnerStoreStatus(state => state.setIsVerified)

  useEffect(() => {
    if(!profile || isPending) return
    if(!storeStatusInfo){
      router.replace(`/signup/owner/store?id=${ownerId}`)
    }

    if(storeStatusInfo?.origin === 'shops'){
      setIsVerified(true)
    }else{
      setIsVerified(false)
    }
  },[storeStatusInfo, isPending, ownerId, router, profile, setIsVerified])

  if (!profile || (isPending && !storeStatusInfo)) {
    return (
      <LoadingToStoreRegister storeStatusInfo={storeStatusInfo} isPending={isPending}/>
    )
  }

  const isPendingApproval = storeStatusInfo?.origin === 'store_registrations'
  
  return (
    <ConfigProvider>
      <App>
        <div className="flex justify-center bg-slate-200 h-screen">
          <div className="w-full max-w-120 bg-white h-screen flex flex-col relative shadow-2xl">
            <OwnerHeader />

            <main className={`flex-1 bg-[#fafafa] overflow-y-auto `}>
              <div className={isPendingApproval ? "filter blur-[2px] pointer-events-none select-none opacity-70" : "h-full"}>
                {children}
              </div>

              {isPendingApproval && !isPending && (
                <StorePendingModal />
              )}
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