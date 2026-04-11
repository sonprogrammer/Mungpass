export function KioskProductSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-6">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="h-40 bg-white rounded-[2.5rem] p-10 flex justify-between items-center shadow-md animate-pulse">
                    <div className="flex flex-col gap-2">
                        <div className="w-60 h-8 bg-slate-200 rounded-md" />
                        <div className="w-40 h-6 bg-slate-100 rounded-md" />
                    </div>
                    <div className="w-40 h-10 bg-emerald-50 rounded-md" />
                </div>
            ))}
        </div>
    )
}