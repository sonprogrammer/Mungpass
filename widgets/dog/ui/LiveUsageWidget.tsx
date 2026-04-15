'use client'

import { MyPetUsageAllInfo } from "@/features/qr/model/types"
import { LiveUsageCard } from "@/widgets/dog/ui/LiveUsageCard"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, ChevronUp, Minimize2 } from "lucide-react"
import { useState } from "react"

export function LiveUsageWidget({ activeDogs, dogCount }: { activeDogs: MyPetUsageAllInfo[], dogCount: number }) {
    const [isMinimized, setIsMinimized] = useState(true)
    const [currentIndex, setCurrentIndex] = useState(0)


    if (!activeDogs || activeDogs.length === 0) return null

    const currentUsage = activeDogs[currentIndex]

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (currentIndex < activeDogs.length - 1) setCurrentIndex(prev => prev + 1)
    }

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (currentIndex > 0) setCurrentIndex(prev => prev - 1)
    }

    return (
        <AnimatePresence mode="wait">
            {isMinimized ? (
                // * 최소화 형태
                <motion.div
                    key="minimized"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 100, opacity: 0 }}
                    onClick={() => setIsMinimized(false)}
                    className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md p-1.5 pr-4 rounded-full shadow-lg border border-orange-500 cursor-pointer pointer-events-auto ring-1 ring-orange-50/50"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border-2 border-white/30 overflow-hidden">
                            <img src={currentUsage.dog.image_url} alt="강아지 프로필 사진" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-black text-sm">
                            {dogCount >= 1 ? `${currentUsage.dog.name}외 ${dogCount}마리 이용중` : `${currentUsage.dog.name} 이용중`}

                        </span>
                    </div>
                    <ChevronUp className="w-5 h-5" />
                </motion.div>
            ) : (
                <motion.div
                    key="maximized"
                    initial={{ y: 50, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 50, opacity: 0, scale: 0.95 }}
                    className="relative w-[80%] group"
                >
                    <div className="relative overflow-hidden">
                        <motion.div
                            className="flex"
                            animate={{ x: `-${currentIndex * 100}%` }}
                            transition={{ type: "spring", stiffness: 260, damping: 26 }}
                        >
                            {activeDogs.map((dogUsage) => (
                                <div key={dogUsage.id} className="min-w-full">
                                    <LiveUsageCard dogUsage={dogUsage} />
                                </div>
                            ))}
                        </motion.div>
                        <button
                            onClick={() => { setIsMinimized(true); setCurrentIndex(0) }}
                            className="cursor-pointer absolute top-4 right-4 p-2 bg-black/20 rounded-full text-white"
                        >
                            <Minimize2 className="w-4 h-4" />
                        </button>
                        {activeDogs.length > 1 && (
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                                {activeDogs.map((_, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setCurrentIndex(idx)}
                                        className={`cursor-pointer w-2 h-2 rounded-full transition-all ${idx === currentIndex ? "bg-orange-500 w-4" : "bg-gray-300"
                                            }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {activeDogs.length > 1 && (
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-3 pointer-events-none z-20">
                            <div className="w-10 h-10 flex items-center justify-start">
                                <AnimatePresence>
                                    {currentIndex > 0 && (
                                        <motion.button
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            onClick={handlePrev}
                                            className="pointer-events-auto cursor-pointer w-8 h-8 flex items-center justify-center bg-black/20 hover:bg-black/40 backdrop-blur-md text-white rounded-full transition-all shadow-md"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="w-10 h-10 flex items-center justify-end">
                                <AnimatePresence>
                                    {currentIndex < activeDogs.length - 1 && (
                                        <motion.button
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            onClick={handleNext}
                                            className="pointer-events-auto cursor-pointer w-8 h-8 flex items-center justify-center bg-black/20 hover:bg-black/40 backdrop-blur-md text-white rounded-full transition-all shadow-md"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    )}

                </motion.div>
            )}
        </AnimatePresence>
    )
}