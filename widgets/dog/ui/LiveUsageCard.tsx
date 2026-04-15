'use client'

import { useTimer } from "@/entities/check-in/lib/useTimer"
import { MyPetUsageAllInfo } from "@/features/qr/model/types"
import { motion } from "framer-motion"
import { AlertCircle, Clock, Wallet } from "lucide-react"


export function LiveUsageCard({ dogUsage }: { dogUsage: MyPetUsageAllInfo }) {
    // console.log('dogusage from card', dogUsage)

    const gracePeriodMins = dogUsage.product.grace_period_mins

    const { displayMins, isOverTime, progress, extraCharge } = useTimer({
        startedAt: dogUsage.started_at,
        expectedEndAt: dogUsage.expected_ended_at,
        endedAt: dogUsage.ended_at,
        gracePeriodMins: gracePeriodMins,
        overtimePolicy: {
            unitMins: dogUsage.product.overtime_unit_mins,
            unitPrice: dogUsage.product.overtime_unit_price
        }
    })
    return (
        <motion.div
            layout
            className={`relative overflow-hidden p-6 rounded-[2.5rem] bg-white shadow-2xl shadow-slate-200/50 border-2 transition-all duration-500 
                ${isOverTime ? 'border-red-500 bg-red-50/30' : 'border-orange-100'}`}
        >
            <div className="flex justify-between items-start mb-8">
                <div className="flex gap-4">
                    <div className="relative">
                        <img
                            src={dogUsage.dog.image_url}
                            className="w-16 h-16 rounded-[2rem] object-cover ring-4 ring-white shadow-md"
                            alt="강아지 프로필 사진"
                        />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-black text-slate-800 leading-none">{dogUsage.dog.name}</h3>
                            <span className="px-2 py-0.5 bg-orange-500 text-white text-[9px] font-black rounded-full animate-pulse tracking-tighter">LIVE</span>
                        </div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{dogUsage.product.name}</p>
                    </div>
                </div>

                <div>


                    <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-xs shadow-sm
                    ${isOverTime ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-600'}`}>
                        {isOverTime ? <AlertCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        <p className="flex flex-col justify-center items-center">
                            <p className="underline">{dogUsage.shop.name}</p>
                            {isOverTime ? '시간 초과' : '이용 중'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center mb-8">
                <div className="relative inline-block">
                    <span className={`text-7xl font-black tracking-tighter tabular-nums leading-none 
                        ${isOverTime ? 'text-red-600' : 'text-slate-800'}`}>
                        {isOverTime && "+"}{displayMins}
                    </span>
                    <span className={`absolute -right-6 bottom-2 font-black text-lg 
                        ${isOverTime ? 'text-red-600' : 'text-slate-400'}`}>m</span>
                </div>

                <div className="w-full mt-6 h-3 bg-slate-100 rounded-full overflow-hidden relative">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress * 100}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className={`h-full rounded-full ${isOverTime ? 'bg-red-500' : 'bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.4)]'}`}
                    />
                </div>
                <div className="w-full flex justify-between mt-2 px-1">
                    <span className="text-[10px] font-bold text-slate-400">START</span>
                    <span className={`text-[10px] font-black ${isOverTime ? 'text-red-500' : 'text-orange-500'}`}>
                        {isOverTime ? 'LIMIT OVER' : 'EXPECTED END'}
                    </span>
                </div>
            </div>


            <div className={`flex items-center justify-between p-4 rounded-3xl transition-colors
                ${isOverTime ? 'bg-red-600 text-white' : 'bg-slate-50 text-slate-600'}`}>
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${isOverTime ? 'bg-white/20' : 'bg-white shadow-sm'}`}>
                        <Wallet className={`w-4 h-4 ${isOverTime ? 'text-white' : 'text-orange-500'}`} />
                    </div>
                    <div className="flex flex-col">
                        <span className={`text-[10px] font-bold opacity-70`}>
                            {isOverTime ? "현재 초과 요금" : "추가 요금 안내"}
                        </span>
                        <span className="text-lg font-black leading-tight">
                            {isOverTime ? `${extraCharge.toLocaleString()}원` : `0원`}
                        </span>
                    </div>
                </div>


                <div className="text-right flex flex-col items-end">
                    <span className="text-[9px] font-bold opacity-60 uppercase">Unit Price</span>
                    <span className="text-[11px] font-black tracking-tight">{dogUsage.product.overtime_unit_mins}분 / {dogUsage.product.overtime_unit_price.toLocaleString()}원</span>
                </div>

            </div>
        </motion.div>
    )
}