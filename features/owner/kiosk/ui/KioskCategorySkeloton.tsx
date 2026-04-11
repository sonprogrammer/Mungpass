

export function KioskCategorySkeleton() {
    return (
        <div className="flex w-full">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="h-28 bg-slate-100 flex-1 rounded-3xl animate-pulse" />
            ))}
        </div>
    )
}


