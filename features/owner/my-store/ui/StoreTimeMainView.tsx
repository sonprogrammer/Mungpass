'use client'

import { Clock3, Edit3, Power, AlertCircle, Timer, Plane, Info, XCircle } from 'lucide-react'
import { Popconfirm, Tag } from 'antd'
import { StoreTimeMainViewProps, VacationSubmitData } from '@/features/owner/my-store/model/types'
import { useState } from 'react'
import { VacationModal } from '@/features/owner/my-store/ui/VacationModal'
import { useUpdateVacation } from '@/features/owner/my-store/model/useUpdateVacation'
import { useDeleteVacation } from '@/features/owner/my-store/model/useDeleteVacation'
import { format } from 'date-fns'
import { useUpdateTempStatus } from '@/features/owner/my-store/model/useUpdataeTempStatus'
import { useDeleteTodayStatus } from '@/features/owner/my-store/model/useDeleteTodayStatus'
import { EarlyCloseConfirmModal } from '@/features/owner/my-store/ui/EarlyCloseConfirmModal'
import { StoreVacationStatus } from '@/features/owner/my-store/ui/StoreVacationStatus'

export function StoreTimeMainView({ shopStatus, onEditClick, shopId, vacation }: StoreTimeMainViewProps) {
    const [isVacationModal, setIsVacationModal] = useState(false)
    const [isReasonModalOpen, setIsReasonModalOpen] = useState(false)
    const [tempType, setTempType] = useState<'SHUTDOWN' | 'EARLY_CLOSE' | null>(null)
    const [reason, setReason] = useState('')


    // * 휴가 설정
    const { mutate: updateVacation } = useUpdateVacation()
    // *휴가 취소
    const { mutate: deleteVacation } = useDeleteVacation()
    // * 즉시 휴무 or  조기 마감 등록
    const { mutate: updateTodayStatus } = useUpdateTempStatus()

    // * 즉시 휴무 or  조기 마감 취소
    const { mutate: deleteTodayStatus } = useDeleteTodayStatus()

    console.log('shopStatus', shopStatus)
    
    // * 당일 용임
    const isVacation = shopStatus.status === '휴가 중'
    const isShutdown = shopStatus.status === '오늘 휴무' || shopStatus.status === '오늘 즉시 휴무'
    const isEarlyClose = shopStatus.status === '조기 마감'

    const handleVacationSubmit = async (data: VacationSubmitData) => {
        const formData = {
            shop_id: shopId,
            ...data,
            updated_at: new Date().toISOString()
        }
        updateVacation(formData)

    }


    const handleUpdateTodayStatus = (type: 'SHUTDOWN' | 'EARLY_CLOSE') => {
        const isCurrentActive = (type === 'SHUTDOWN' && isShutdown) || (type === 'EARLY_CLOSE' && isEarlyClose)
        if (isCurrentActive) {
            deleteTodayStatus(shopId)
        } else {
            setTempType(type)
            setIsReasonModalOpen(true)
        }

    }

    const handleConfirmUpdate = () => {
        if(!tempType) return
        updateTodayStatus({
            shopId,
            type: tempType,
            reason: reason
        })
        setIsReasonModalOpen(false)
        setReason('')
    }

    const handleDeleteVacation = () => {
        if(!shopId) return
        console.log('clciekc')
        deleteVacation(shopId)
    }

    return (
        <>
            <div className="flex flex-col gap-6 animate-in fade-in duration-500 overflow-y-auto h-full">

                <header className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${shopStatus.status === '휴가 중' ? 'bg-blue-50 text-blue-500' : 'bg-orange-50 text-orange-500'}`}>
                            {shopStatus.status === '휴가 중' ? <Plane size={24} /> : <Clock3 size={24} />}
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 tracking-tight">영업 관리</h2>
                            <p className="text-[11px] text-gray-400 font-medium">매장 운영 상태를 실시간 제어</p>
                        </div>
                    </div>
                    <Tag color={shopStatus.status === '영업 중' ? 'success' : 'error'} className="px-3 py-1 m-0 border-none font-bold rounded-full text-[10px] shadow-sm">
                        {shopStatus.status}
                    </Tag>
                </header>


                <section className={`relative rounded-3xl p-6 text-white shadow-xl transition-all duration-300 
                    ${isVacation ? 'bg-slate-700' :
                        isShutdown ? 'bg-red-700 shadow-rose-200' :
                        isEarlyClose ? 'bg-amber-500 shadow-amber-200' : 'bg-linear-to-br from-slate-800 to-slate-700 shadow-slate-200'
                    }`}>
                    <div className="flex items-center gap-2 mb-4 opacity-80">
                        {isVacation ? <Plane size={14} /> : <Timer size={14} />}
                        <span className="text-[11px] font-bold uppercase tracking-wider">
                            {isVacation ? 'Vacation Period' : `Today's Schedule`}
                        </span>
                        {isVacation && (
                            <Popconfirm
                                title="휴가 일정을 취소하시겠습니까?"
                                description="취소 즉시 정상 영업 스케줄로 복귀합니다."
                                onConfirm={handleDeleteVacation}
                                okText="네, 취소합니다"
                                cancelText="아니오"
                                okButtonProps={{ danger: true }}
                                className='absolute right-8 top-6'
                            >
                                <button className="cursor-pointer flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-500 hover:bg-red-700 transition-colors text-[10px] font-bold border border-white/10 backdrop-blur-md">
                                    <XCircle size={14} />
                                    일정 취소
                                </button>
                            </Popconfirm>
                        )}
                    </div>

                    {isShutdown ? (
                        <div className="py-2">
                            <p className="text-2xl font-black text-white leading-tight">오늘 즉시 휴무 중</p>
                            <p className="text-[13px] text-rose-100 mt-2 font-medium opacity-90">
                                {shopStatus?.reason}
                            </p>
                        </div>
                    ) : isEarlyClose ? (
                        <div className="py-2">
                            <p className="text-2xl font-black text-white leading-tight">영업 조기 마감</p>
                            <p className="text-[13px] text-amber-50 mt-2 font-medium">
                                {shopStatus?.reason}
                            </p>
                        </div>
                    ) : isVacation ? (
                        <div className="py-2">
                            <div className="mb-1 flex items-center gap-2">
                                {shopStatus.start_date && shopStatus.end_date && (
                                    <span className="text-sm font-bold text-blue-100 bg-white/10 px-2 py-0.5 rounded-md">
                                        {format(new Date(shopStatus.start_date), 'MM.dd')} ~ {format(new Date(shopStatus.end_date), 'MM.dd')}
                                    </span>
                                )}
                            </div>
                            <p className="text-2xl font-black text-white">장기 휴가 중</p>
                            <div className="flex items-start gap-2 mt-3 bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                                <Info size={14} className="mt-0.5 shrink-0" />
                                <p className="text-[13px] font-medium text-blue-50 leading-snug">
                                    {shopStatus.reason || '개인 사정으로 인해 잠시 쉬어갑니다.'}
                                </p>
                            </div>
                        </div>
                    ) : shopStatus.schedule?.is_closed ? (
                        <div className="py-2">
                            <p className="text-2xl font-black text-slate-400">정기 휴무일</p>
                            <p className="text-xs text-slate-500 mt-1">주간 스케줄에 설정된 휴무일입니다.</p>
                        </div>
                    ) : (
                        <div className="flex items-center justify-around py-2">
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] text-blue-400 font-bold mb-1 uppercase">Open</span>
                                <span className="text-3xl font-black tracking-tighter tabular-nums">
                                    {shopStatus.schedule?.open_time.slice(0, 5)}
                                </span>
                            </div>
                            <div className="h-8 w-0.5 bg-slate-400/50 mx-2" />
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] text-red-400 font-bold mb-1 uppercase">Close</span>
                                <span className="text-3xl font-black tracking-tighter tabular-nums">
                                    {shopStatus.schedule?.close_time.slice(0, 5)}
                                </span>
                            </div>
                        </div>
                    )}

                    <button onClick={onEditClick} className="absolute group right-3 top-3 rounded-2xl cursor-pointer p-2 transition-all hover:bg-white/10 active:scale-[0.98]">
                        <Edit3 size={16} className="text-gray-300 group-hover:text-white" />
                    </button>
                </section>

                {/* //* 즉시 휴무, 조기마감 */}
                <section>

                    <div className="flex gap-3">
                        <button
                            onClick={() => { handleUpdateTodayStatus('SHUTDOWN'); }}
                            className={`flex-1 flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all active:scale-95 ${
                                isShutdown 
                                ? 'bg-rose-500 text-white border-rose-600 shadow-md' 
                                : 'bg-rose-50/40 text-rose-500 border-rose-100 hover:bg-rose-50'
                            }`}
                        >
                            {isShutdown ? <XCircle size={20} /> : <Power size={20} />}
                            <span className="text-[11px] font-bold">{isShutdown ? '휴무 해제' : '즉시 휴무'}</span>
                        </button>
                        <button
                            onClick={() => handleUpdateTodayStatus('EARLY_CLOSE')}
                            className={`flex-1 flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all active:scale-95 ${
                                isEarlyClose 
                                ? 'bg-amber-500 text-white border-amber-600 shadow-md' 
                                : 'bg-amber-50/40 text-amber-600 border-amber-100 hover:bg-amber-50'
                            }`}
                        >
                            {isEarlyClose ? <XCircle size={20} /> : <AlertCircle size={20} />}
                            <span className="text-[11px] font-bold">{isEarlyClose ? '마감 해제' : '조기 마감'}</span>
                        </button>

                        <button
                            onClick={() => setIsVacationModal(true)}
                            className={`flex-1 flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all active:scale-95 ${
                                isVacation 
                                ? 'bg-blue-500 text-white border-blue-600 shadow-md' 
                                : 'bg-blue-50/40 text-blue-600 border-blue-100 hover:bg-blue-50'
                            }`}
                        >
                            <Plane size={20} />
                            <span className="text-[11px] font-bold">{isVacation ? '일정 수정' : '장기 휴가'}</span>
                        </button>
                    </div>
                </section>


                {!isVacation && vacation && (
                    <StoreVacationStatus vacation={vacation} onDelete={handleDeleteVacation}/>
                )}

                <footer className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                    <p className="text-[11px] leading-relaxed text-slate-500">
                        💡 <b>알림:</b> 정기 휴무가 아닌 예외적 휴무일 경우 일찍 닫으실 경우 <b>조기 마감</b> 혹은 <b>즉시 휴무</b>기능을 권장합니다.
                    </p>
                </footer>
            </div>
            <VacationModal open={isVacationModal} onClose={() => setIsVacationModal(false)} onSubmit={handleVacationSubmit} />
            <EarlyCloseConfirmModal reason={reason} setReason={setReason} tempType={tempType} open={isReasonModalOpen} onClose={()=>setIsReasonModalOpen(false)} onConfirm={handleConfirmUpdate}/>
        </>
    )
}