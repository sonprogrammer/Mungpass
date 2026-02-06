'use client'

import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export function BackBtn() {
    const router = useRouter()
    
    return(
        <button
            onClick={() => router.back()}
            className={`cursor-pointer p-2 ml-2 bg-amber-600 hover:bg-red-300 rounded-full  flex items-center justify-center `}
        >
            <ChevronLeft className="w-8 h-8 "/>
            
        </button>
    )
}