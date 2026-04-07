'use client'

import { Dog } from "@/entities/dog/model/types"
import { MyPetUsageAllInfo } from "@/features/qr/model/types"
import { LiveUsageCard } from "@/widgets/dog/ui/LiveUsageCard"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronUp, Minimize2 } from "lucide-react"
import { useState } from "react"

export function LiveUsageWidget({ activeDogs }: { activeDogs: MyPetUsageAllInfo[] }) {
    const [isMinimized, setIsMinimized] = useState(false)

    if (!activeDogs || activeDogs.length === 0) return null


    const currentUsage = activeDogs[0] // 가장 최근 이용 내역

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
                    className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md p-1.5 pr-4 rounded-full shadow-lg border border-orange-100 cursor-pointer pointer-events-auto ring-1 ring-orange-50/50"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border-2 border-white/30 overflow-hidden">
                            <img src={currentUsage.dog.image_url} alt="" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-black text-sm">{currentUsage.dog.name}가 이용 중이에요</span>
                    </div>
                    <ChevronUp className="w-5 h-5" />
                </motion.div>
            ) : (
                <motion.div
                    key="maximized"
                    initial={{ y: 50, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 50, opacity: 0, scale: 0.95 }}
                    className="relative w-[80%]"
                >
                    <div className="relative shadow-2xl rounded-2xl">
                        <LiveUsageCard dogUsage={currentUsage} />
                        <button
                            onClick={() => setIsMinimized(true)}
                            className="absolute top-4 right-4 p-2 bg-black/10 rounded-full text-white"
                        >
                            <Minimize2 className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}