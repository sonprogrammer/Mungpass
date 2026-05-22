'use client'

import { NoticeFromDb } from "@/features/owner/my-store/notices/model/types"
import StoreNoticeItem from "@/features/user/shopInfo/ui/StoreNoticeItem"
import { motion } from "framer-motion"
import { X, Megaphone } from "lucide-react"
import { useCallback, useMemo, useState } from "react"

interface StoreNoticePanelProps {
    onClose: () => void
    notices: NoticeFromDb[] | []
}

export function StoreNoticeInfo({ onClose, notices }: StoreNoticePanelProps) {
    const [expandedId, setExpandedId] = useState<string | null>(
        notices.length === 1 ? notices[0].id : null
    )

    // * 최근값 가져오기
    const latestNoticeId = useMemo(() => {
        if(!notices || notices.length === 0) return null

        const latest = notices.reduce((acc, cur) => {
            const prev = acc.created_at ? new Date(acc.created_at).getTime() : 0
            const curTime = cur.created_at ? new Date(cur.created_at).getTime() : 0
            return curTime > prev ? cur : acc
        })
        return latest.id
    }, [notices])

    const handleToggle = useCallback((id: string | null) => {
        setExpandedId(id)
    },[])

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="absolute inset-x-0 bottom-10 bg-white/95 max-w-120 backdrop-blur-md p-6 rounded-[2.5rem] overflow-y-auto shadow-2xl border border-orange-50 z-220"
        >

            <div className="flex items-center justify-between px-5 pt-5 pb-4">
                <div className="flex items-center gap-2.5">

                    <div className="w-9 h-9 rounded-2xl bg-orange-500 flex items-center justify-center shadow-md shadow-orange-200">
                        <Megaphone className="w-4 h-4 text-white" strokeWidth={2.5} />
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-orange-400 uppercase tracking-widest leading-none mb-0.5">
                            Notice
                        </p>
                        <h2 className="text-base font-black text-slate-800 leading-none">
                            사장님 공지사항
                        </h2>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center active:scale-95 transition-transform"
                >
                    <X className="w-4 h-4 text-slate-500" strokeWidth={2.5} />
                </button>
            </div>


            <div className="mx-5 h-px bg-linear-to-r from-orange-200 via-orange-100 to-transparent mb-4" />

            {notices.length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center gap-3 pb-10">
                    <div className="w-16 h-16 rounded-3xl bg-orange-50 flex items-center justify-center">
                        <Megaphone className="w-7 h-7 text-orange-200" />
                    </div>
                    <p className="text-sm font-bold text-slate-400">등록된 공지사항이 없습니다</p>
                </div>
            )}

            <ul className="flex-1 overflow-y-auto px-5 pb-8 space-y-3">
                {notices.map((notice, i) => {

                    return (
                        <StoreNoticeItem 
                            key={notice.id}
                            notice={notice}
                            index={i}
                            isExpanded={expandedId === notice.id}
                            isLatest={notice.id === latestNoticeId}
                            onToggle={handleToggle}
                        />
                    )
                })}
            </ul>
        </motion.div>
    )
}