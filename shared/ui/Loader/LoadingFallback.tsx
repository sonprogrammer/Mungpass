'use client'

import { Loader2 } from "lucide-react";

interface LoadingFallback {
    text: string
}

export function LoadingFallback({ text }: LoadingFallback) {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-10  rounded-4xl border border-orange-50/50">
            <Loader2 className="w-6 h-6 text-orange-200 animate-spin mb-2" />
            <p className="text-xs text-slate-400 font-medium">{text}</p>
        </div>
    )
}