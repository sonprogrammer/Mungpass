'use client'

import { useGetMyPetUsage } from "@/features/qr/model/useGetMyPetUsage"
import { LiveUsageWidget } from "@/widgets/dog/ui/LiveUsageWidget"
import { usePathname } from "next/navigation"



export function GlobalLiveUsage() {
    const pathname = usePathname()
    const { data: activeDogs =[]} = useGetMyPetUsage({statuses: ['staying']})

    console.log('activdog from global', activeDogs)
    
    // TODO 만약에 어느 페이지 진입시 전역 체크인 상태컴포넌트를 보여주고 싶지 않을시 사용하기
    if(pathname === '/my-pets' || !activeDogs.length) return null

    const checkingDogCount = activeDogs.length -1

    return(
        <div className="relative h-full w-full flex justify-end">
            <LiveUsageWidget activeDogs={activeDogs} dogCount={checkingDogCount}/>
        </div>
    )

}