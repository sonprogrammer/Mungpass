'use client'

import { usePathname, useSearchParams } from "next/navigation"

export function StepBar() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    
    const isReRegister = searchParams.get('mode') === 'edit'
    
    if(isReRegister || pathname === '/signup/owner/re-store') return null

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

                <div className="flex gap-1 py-2 px-6">
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