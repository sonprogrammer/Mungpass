'use client'

import { KioskAuthModal } from "@/features/owner/kiosk/ui"
import { Key } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"



export function KioskExit({shopId}: {shopId: string}) {
    const [isAuthOpen, setIsAuthOpen] = useState(false)
    const router = useRouter()

    return(

        <>
            {/* //*사장 페이지로 복귀하는 버튼 */}
            <button
                title='사장 페이지로 이동'
                type='button'
                className="fixed bottom-6 left-6 w-8 h-8 cursor-pointer flex items-center justify-center bg-slate-400 text-slate-200 rounded-full hover:bg-slate-800 hover:text-white transition-all shadow-sm active:scale-95"
                onClick={() => setIsAuthOpen(true)}
            >
                <Key size={20} />
            </button>
            
            {/* //* 비밀번호 확인후 사장페이지로 이동가능 */}
            <KioskAuthModal 
                shopId={shopId}
                isOpen={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
                onSuccess={ () => {
                    setIsAuthOpen(false)
                    router.replace('/owner')
                }}
            />
        </>
    )
}