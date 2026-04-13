'use client'

import { useGetMyPetUsage } from "@/features/qr/model/useGetMyPetUsage"
import { LiveUsageWidget } from "@/widgets/dog/ui/LiveUsageWidget"
import { usePathname } from "next/navigation"



export function GlobalLiveUsage() {
    const pathname = usePathname()
    const { data: activeDogs =[]} = useGetMyPetUsage({statuses: ['staying']})

    console.log('activdog from global', activeDogs)
    
    if(pathname === '/my-pets' || !activeDogs.length) return null

    const checkingDogCount = activeDogs.length -1

    return(
        <div className="relative h-full w-full flex justify-end">
            <LiveUsageWidget activeDogs={activeDogs} dogCount={checkingDogCount}/>
        </div>
    )

}