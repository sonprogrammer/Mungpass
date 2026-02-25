export function RoleTab({isOwner, setIsOwner}: {isOwner: boolean, setIsOwner: (o: boolean) => void}) {
    return(
        <div className="px-6 z-10 w-[50%]">
            <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                <button
                    onClick={() => setIsOwner(false)}
                    className={`flex-1 py-2 text-xs font-black rounded-xl transition-all
                                ${!isOwner ? 'bg-white text-slate-800 shadow-md' : 'text-slate-400'}
                        `}
                >
                    일반 유저
                </button>
                <button
                    onClick={() => setIsOwner(true)}
                    className={`flex-1 py-2 text-xs font-black rounded-xl transition-all
                            ${isOwner ? 'bg-orange-500 text-white shadow-md' : 'text-slate-400'}
                        `}
                >
                    멍패스 사장님
                </button>
            </div>
        </div>
    )
}