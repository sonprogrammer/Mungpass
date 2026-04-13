

export function KioskHeader() {
    return (
        <header className="p-8 border-b flex items-center justify-center relative bg-white">
            <div className="flex flex-col items-center font-black absolute left-10">
                <div className="flex gap-1 text-[16px]">
                    <h1 className="text-emerald-500 font-black">멍</h1>
                    <h1>PASS</h1>
                </div>
                <div className="uppercase text-[10px] -m-1.25">kiosk</div>
            </div>
            <h1 className="text-3xl font-bold text-center">체크인 키오스크</h1>
        </header>
    )
}