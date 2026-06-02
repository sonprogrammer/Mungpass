'use client'

import { UsageStoryList } from "@/entities/check-in/ui"
import { CheckedInWidgetProps } from "@/widgets/my-pets/model"



export function CheckedInWidget({ activeDogs, onDogClick }: CheckedInWidgetProps) {
    if (activeDogs.length === 0) return null

    return (
        <section className="border-b-2 border-slate-200">
            <h2 className="text-xs font-black text-slate-400 mb-1 px-2 tracking-widest uppercase">Checked-In</h2>
            <div className="flex gap-4 overflow-x-auto py-2 px-2 no-scrollbar scroll-smooth">
                {activeDogs.map(usage => (
                    <UsageStoryList
                        key={usage.id}
                        usageDog={usage}
                        onClick={()=>onDogClick(usage)}
                    />
                ))}
            </div>
        </section>
    )
}