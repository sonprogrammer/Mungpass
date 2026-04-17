'use client'

import { StoreScheduleInfoProps } from "@/features/user/shopInfo/model/types";
import { CalendarDays, X } from "lucide-react";
import { motion } from "framer-motion";


export function StoreScheduleInfo({ onClose, schedules, vacation, todayShopStatus }: StoreScheduleInfoProps) {
    
    
    const todayNum = new Date().getDay()

    return (
        <>
            

            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
                className="absolute inset-x-0 bottom-10 bg-white/95 max-w-120 backdrop-blur-md p-6 rounded-[2.5rem] overflow-y-auto shadow-2xl border border-orange-50 z-220">
                <div className="flex justify-between items-center mb-5">
                    <h5 className="text-sm font-black text-slate-800 flex items-center gap-2">
                        <CalendarDays className="w-4 h-4 text-orange-500" /> 운영 스케줄
                    </h5>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full"><X className="w-4 h-4" /></button>
                </div>

                {/* //* 조기마감, 휴무등 상태랑 이유나옴 */}
                {todayShopStatus.reason && (
                    <div className="mb-4 p-4 bg-orange-50 rounded-2xl border border-orange-100">
                        <p className="text-xs font-black text-orange-600 mb-1">📢 매장 소식</p>
                        <p className="text-xs font-bold text-slate-700 leading-relaxed">{todayShopStatus.reason}</p>
                    </div>
                )}

                <div className="space-y-3 px-1">
                    {schedules?.map((s) => {

                        const isToday = s.day_of_week === todayNum

                        return (
                            <div key={s.day_of_week} className="flex justify-between items-center">
                                <span className={`text-xs ${isToday ? 'font-black text-orange-600' : 'font-bold text-slate-400'}`}>
                                    {['일', '월', '화', '수', '목', '금', '토'][s.day_of_week]}요일 {isToday && "(오늘)"}
                                </span>
                                <span className={`text-xs ${isToday ? 'font-black text-slate-800' : 'font-medium text-slate-500'}`}>
                                    {s.is_closed ? '정기 휴무' : `${s.open_time.slice(0, 5)} - ${s.close_time.slice(0, 5)}`}
                                </span>
                            </div>
                        )
                    })}
                </div>

                {/* TODO 나중에 공지사항 등록했을 때 여기서도 나오게 하기 */}
                {vacation && (
                    <div className="mt-4 p-3 bg-red-50 rounded-xl border border-red-100">
                        <p className="text-[10px] font-bold text-red-500 leading-tight">
                            📢 휴가 공지: {vacation.reason}<br />
                            <span>
                            기간 : 
                                {vacation.start_date} ~ {vacation.end_date}
                            </span>
                        </p>
                    </div>
                )}
            </motion.div>
        </>
    )
}