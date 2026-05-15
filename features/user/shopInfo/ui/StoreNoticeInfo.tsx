'use client'

import { NoticeFromDb } from "@/features/owner/my-store/notices/model/types"
import { motion } from "framer-motion"
import { X, Megaphone, ChevronDown, Clock } from "lucide-react"
import { useState } from "react"

interface StoreNoticePanelProps {
    onClose: () => void
    notices: NoticeFromDb[] | []
}

export function StoreNoticeInfo({ onClose, notices }: StoreNoticePanelProps) {
    const [expandedId, setExpandedId] = useState<string | null>(
        notices.length === 1 ? notices[0].id : null
    )

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
                {notices.map((notice, index) => {
                    const isExpanded = expandedId === notice.id
                    const isLatest = index === 0

                    return (
                        <motion.li
                            key={notice.id}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.06 }}
                        >
                            <button
                                onClick={() => setExpandedId(isExpanded ? null : notice.id)}
                                className={`w-full text-left rounded-2xl border transition-all duration-200 overflow-hidden
                                    ${isExpanded
                                        ? 'border-orange-200 bg-white shadow-lg shadow-orange-100/60'
                                        : 'border-slate-100 bg-white/80 shadow-sm'
                                    }`}
                            >
                                <div className="flex items-center gap-3 px-4 py-3.5">
                                    <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black
                                        ${isLatest
                                            ? 'bg-orange-500 text-white'
                                            : 'bg-slate-100 text-slate-400'
                                        }`}>
                                        {index + 1}
                                    </span>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1.5 mb-0.5">
                                            {isLatest && (
                                                <span className="text-[9px] font-black text-orange-500 uppercase tracking-widest bg-orange-50 px-1.5 py-0.5 rounded-full">
                                                    NEW
                                                </span>
                                            )}
                                        </div>
                                        <p className={`text-sm font-bold truncate leading-snug
                                            ${isExpanded ? 'text-slate-800' : 'text-slate-600'}`}>
                                            {notice.title}
                                        </p>
                                    </div>

                                    <ChevronDown
                                        className={`shrink-0 w-4 h-4 text-slate-400 transition-transform duration-300
                                            ${isExpanded ? 'rotate-180 text-orange-400' : ''}`}
                                        strokeWidth={2.5}
                                    />
                                </div>

                                <motion.div
                                    initial={false}
                                    animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-4 pb-4">

                                        <div className="h-px bg-linear-to-r from-orange-100 to-transparent mb-3" />
                                        <p className="text-[13px] text-slate-600 leading-relaxed whitespace-pre-wrap">
                                            {notice.content}
                                        </p>
                                        {notice.created_at && (
                                            <div className="flex items-center gap-1 mt-3">
                                                <Clock className="w-3 h-3 text-slate-300" />
                                                <span className="text-[10px] text-slate-400 font-medium">
                                                    {new Date(notice.created_at).toLocaleDateString('ko-KR', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            </button>
                        </motion.li>
                    )
                })}
            </ul>
        </motion.div>
    )
}