'use client'

import { Skeleton } from "antd"

export function CurrentLogSkeleton() {
    return(
        <div className="flex flex-col gap-4 px-2">
            {Array.from({length: 4}).map((_,i) => (
                <div key={i} className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <Skeleton 
                        loading={true} 
                        active
                        avatar={{ shape: 'circle', size: 'large' }}
                        paragraph={{ rows: 1, width: '60%' }}
                        title={{ width: '30%' }}
                    />
                </div>
            ))}
        </div>
    )
}