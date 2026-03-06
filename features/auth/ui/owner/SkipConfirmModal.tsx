'use client'

import { SkipConfirmModalProps } from "@/features/auth/model/types"
import { AnimatePresence, motion } from "framer-motion"
import { AlertCircle } from "lucide-react"


export function SkipConfirmModal({ isOpen, onClose, onConfirm }: SkipConfirmModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-sm bg-white rounded-[2.5rem] p-8 z-101 shadow-2xl"                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-4">
                                <AlertCircle className="w-8 h-8 text-orange-500" />
                            </div>

                            <h3 className="text-xl font-black text-slate-800 mb-2">
                                나중에 등록하시겠어요?
                            </h3>
                            <p className="text-sm text-slate-500 leading-relaxed mb-8">
                                가게 등록 전까지는 <br />
                                <span className="text-orange-600 font-bold underline decoration-orange-200">일부 사장님 전용 서비스</span> 이용이 <br />
                                제한될 수 있습니다.
                            </p>

                            <div className="flex flex-col w-full gap-2">
                                <button 
                                    onClick={onConfirm}
                                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm active:scale-95 transition-transform cursor-pointer hover:bg-slate-900/80"
                                >
                                    네, 나중에 할게요
                                </button>
                                <button 
                                    onClick={onClose}
                                    className="w-full py-4 bg-slate-100 text-slate-500 rounded-2xl font-bold text-sm active:scale-95 transition-transform cursor-pointer hover:bg-slate-200"
                                >
                                    아니요, 지금 등록할게요
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}

        </AnimatePresence>
    )
}