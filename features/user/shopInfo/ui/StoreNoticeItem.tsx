'use client'

import { NoticeFromDb } from "@/features/owner/my-store/notices/model"
import { motion } from "framer-motion"
import { ChevronDown, Clock } from "lucide-react"
import { memo } from "react"

interface StoreNoticeItemProps{
    notice: NoticeFromDb
    index: number;
    isExpanded: boolean
    isLatest: boolean
    onToggle: (id: string | null) => void
}


function StoreNoticeItemInner({ notice, index, isExpanded, isLatest, onToggle}: StoreNoticeItemProps){

    return(
        <motion.li
                            key={notice.id}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.06 }}
                        >
                            <button
                                onClick={() => onToggle(isExpanded ? null : notice.id)}
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
}

export const StoreNoticeItem = memo(StoreNoticeItemInner)