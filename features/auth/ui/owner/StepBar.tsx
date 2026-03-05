'use client'

import { usePathname } from "next/navigation"

export function StepBar() {
    const pathname = usePathname()

    const steps = [
        { path: '/signup/owner', step: 1 },
        { path: '/signup/owner/store', step: 2 },
        { path: '/signup/owner/auth', step: 3 },
        { path: '/signup/owner/complete', step: 4 },
    ]

    const currentStep = steps.find((s) => pathname === s.path)?.step ?? 1


    return (
        <>
            {currentStep === 4 ? (
                <div className="hidden"/>
            ) : (

                <div className="flex gap-1 pb-6 px-6">
                    {[1, 2, 3].map((n) => (
                        <div
                            key={n}
                            className={`h-1.5 flex-1 rounded-full transition-all duration-700 
                    ${currentStep >= n ? 'bg-orange-500' : 'bg-orange-100'}`}
                        />
                    ))}
                </div>
            )}
        </>
    )
}