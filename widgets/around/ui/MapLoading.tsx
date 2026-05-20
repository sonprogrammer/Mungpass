'use client'

import { Loader2 } from "lucide-react"

interface MapLoadingProps {
    type?: 'spinner' | 'skeleton'
    message?: string
    fullScreen?: boolean
}

export function MapLoading({ type = 'spinner', message, fullScreen }: MapLoadingProps) {

    //*Aroundpage
    return (
        <div className="mt-10 flex flex-col items-center justify-center p-10 bg-white rounded-4xl border border-orange-50/50">
            <Loader2 className="w-6 h-6 text-orange-200 animate-spin mb-2" />
            <p className="text-xs text-slate-400 font-medium">{message}</p>
        </div>
    )
}