'use client'

import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export function BackBtn() {
    const router = useRouter()
    
    return(
        <button onClick={() => router.back()}
                    className="p-3 bg-white rounded-2xl shadow-sm hover:shadow-md acitve: scale-95 transition-all -ml-2 cursor-pointer"
                >
                    <ChevronLeft className="w-6 h-6 text-slate-600" />
                </button>
    )
}