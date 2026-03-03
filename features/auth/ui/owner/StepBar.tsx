'use client'

import { usePathname } from "next/navigation"

export function StepBar() {
    const pathname = usePathname()

    const currentStep = pathname.includes('/store') ? 2 : 1
    const step = [1,2]
    
    return(
        <div className="flex gap-1 mb-6">
            {step.map((n) => (
                <div
                    key={n}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${currentStep >= n ? 'bg-orange-500' : 'bg-orange-100'}`}
                />
            ))}
        </div>
    )
}