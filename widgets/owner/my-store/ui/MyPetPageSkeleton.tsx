'use client'

import { Skeleton } from "antd"

export function MyPetPageSkeleton() {
    return(
        <main className="h-screen p-6 w-full space-y-6 bg-slate-50/50">
            <header className="flex justify-center relative mb-10">
                <Skeleton.Input active style={{ width: 120, height: 32, borderRadius: '1rem' }} />
                <div className="absolute right-0 top-0">
                    <Skeleton.Button active style={{ width: 44, height: 44, borderRadius: '1rem' }} />
                </div>
            </header>

            <div className="space-y-4 px-2">
                <Skeleton.Input active size="small" style={{ width: 60, height: 14, borderRadius: '4px' }} />
                <div className="flex gap-5">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex flex-col items-center gap-3">
                            <div className="p-1 border-2 border-slate-100 rounded-full">
                                <Skeleton.Avatar active size={64} shape="circle" />
                            </div>
                            <Skeleton.Input active size="small" style={{ width: 40, height: 12 }} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 2 }).map((_, i) => (
                    <div 
                        key={i} 
                        className="aspect-4/5 bg-white rounded-[2.5rem] p-6 flex flex-col justify-between shadow-sm border border-slate-100/50"
                    >
                        <Skeleton.Button 
                            active 
                            block 
                            style={{ height: '100px', borderRadius: '1.8rem' }} 
                        />
                        <div className="space-y-2">
                            <Skeleton.Input active style={{ width: '80%', height: 20 }} />
                            <Skeleton.Input active style={{ width: '50%', height: 14 }} />
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}