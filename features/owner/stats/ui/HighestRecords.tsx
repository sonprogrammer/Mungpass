import { HighestRecordsProps } from "@/features/owner/stats/model/types";



export function HighestRecords({topDays}: HighestRecordsProps) {
    return (
        <article className="relative overflow-hidden rounded-4xl border border-gray-100 bg-white p-2 shadow-sm transition-all hover:shadow-md">

            <div className="space-y-1">
                {topDays.map((item) => (
                    <div
                     key={item.id} className="flex items-center justify-between rounded-2xl p-2 transition-colors hover:bg-gray-100">
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{item.label}</p>
                            <p className="mt-0.5 text-sm font-bold text-gray-800">{item.value}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[11px] font-semibold text-orange-500">{item.subValue}</p>
                        </div>
                    </div>
                ))}
            </div>
        </article>
    )
}