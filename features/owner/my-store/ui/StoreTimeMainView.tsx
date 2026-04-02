'use client'

import { Clock3, Edit3, Power, AlertCircle, Timer, Plane, Info, XCircle } from 'lucide-react'
import { App, Popconfirm, Tag } from 'antd'
import { StoreTimeMainViewProps, VacationSubmitData } from '@/features/owner/my-store/model/types'
import { useState } from 'react'
import { VacationModal } from '@/features/owner/my-store/ui/VacationModal'
import { useUpdateVacation } from '@/features/owner/my-store/model/useUpdateVacation'
import { useDeleteVacation } from '@/features/owner/my-store/model/useDeleteVacation'
import { format, formatDate } from 'date-fns'

export function StoreTimeMainView({ shopStatus, onEditClick, shopId }: StoreTimeMainViewProps) {
    const [isVacationModal, setIsVacationModal] = useState(false)

    console.log('shpasfasd', shopStatus)

    const { mutate: updateVacation } = useUpdateVacation()
    const { mutate: deleteVacation } = useDeleteVacation()



    const handleVacationSubmit = async (data: VacationSubmitData) => {
        const formData = {
            shop_id: shopId,
            ...data
        }
        updateVacation(formData)

    }


    const { message } = App.useApp()
    // TODO 기능 api요청 성공했을때 해주기
    const handleAlert = (s: string) => {
        console.log('clicke')
        message.warning({
            content: `${s}`,
            key: 'alert',
            duration: 2
        })
    }

    return (
        <>
            <div className="flex flex-col gap-6 animate-in fade-in duration-500">

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


                <section className="relative rounded-3xl bg-linear-to-br from-slate-800 to-slate-700 p-6 text-white shadow-xl shadow-slate-200">
                    <div className="flex items-center gap-2 mb-4 opacity-80">
                        {shopStatus.status === '휴가 중' ? <Plane size={14} /> : <Timer size={14} />}
                        <span className="text-[11px] font-bold uppercase tracking-wider">
                            {shopStatus.status === '휴가 중' ? 'Vacation Period' : `Today's Schedule`}
                        </span>
                        {shopStatus.status === '휴가 중' && (
                            <Popconfirm
                                title="휴가 일정을 취소하시겠습니까?"
                                description="취소 즉시 정상 영업 스케줄로 복귀합니다."
                                onConfirm={() => deleteVacation(shopId)}
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

                    {shopStatus.status === '휴가 중' ? (
                        <div className="py-2">
                            <div className="mb-1 flex items-center gap-2">
                                {shopStatus.start_date && shopStatus.end_date && (
                                    <span className="text-sm font-bold text-blue-100 bg-white/10 px-2 py-0.5 rounded-md">
                                        {format(new Date(shopStatus.start_date), 'MM.dd')} — {format(new Date(shopStatus.end_date), 'MM.dd')}
                                    </span>
                                )}
                            </div>
                            <p className="text-2xl font-black text-white leading-tight">현재 장기 휴가 중입니다</p>
                            <div className="flex items-start gap-2 mt-3 bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                                <Info size={14} className="mt-0.5 shrink-0" />
                                <p className="text-[13px] font-medium text-blue-50 leading-snug">
                                    {shopStatus.reason || '개인 사정으로 인해 잠시 쉬어갑니다.'}
                                </p>
                            </div>
                        </div>
                    ) : shopStatus.schedule?.is_closed ? (
                        <div className="py-2">
                            <p className="text-2xl font-black text-slate-400">오늘은 정기 휴무입니다</p>
                            <p className="text-xs text-slate-500 mt-1 font-medium">주간 설정에서 휴무일을 변경할 수 있습니다.</p>
                        </div>
                    ) : (
                        <div className="flex items-center justify-around">
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] text-blue-400 font-bold mb-1 uppercase">Open</span>
                                <span className="text-3xl font-black tracking-tighter tabular-nums">
                                    {shopStatus.schedule?.open_time.slice(0, 5)}
                                </span>
                            </div>
                            <div className="h-8 w-0.5 bg-slate-400/50 mx-2 mb-1" />
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] text-red-400 font-bold mb-1 uppercase">Close</span>
                                <span className="text-3xl font-black tracking-tighter tabular-nums">
                                    {shopStatus.schedule?.close_time.slice(0, 5)}
                                </span>
                            </div>

                            <button
                                onClick={onEditClick}
                                className="absolute group right-3 top-3 rounded-2xl cursor-pointer p-2 transition-all hover:bg-white/10 active:scale-[0.98]"
                                title='영업시간 수정'
                            >
                                <Edit3 size={16} className="text-gray-300 group-hover:text-white transition-colors" />
                            </button>
                        </div>
                    )}
                </section>

                {/* //* 즉시 휴무, 조기마감 */}
                <section>

                    <div className="flex gap-3">
                        <button
                            onClick={() => handleAlert('오늘 즉시 휴무 모드')}
                            className="flex-1 flex flex-col items-center gap-2 rounded-2xl border border-rose-100 bg-rose-50/40 p-4 text-rose-500 transition-all hover:bg-rose-50 active:scale-95"
                        >
                            <Power size={20} />
                            <span className="text-[11px] font-bold">오늘 즉시 휴무</span>
                        </button>
                        <button
                            onClick={() => handleAlert('조기 마감 모드')}
                            className="flex-1 flex flex-col items-center gap-2 rounded-2xl border border-amber-100 bg-amber-50/40 p-4 text-amber-600 transition-all hover:bg-amber-50 active:scale-95"
                        >
                            <AlertCircle size={20} />
                            <span className="text-[11px] font-bold">조기 마감하기</span>
                        </button>

                        <button
                            onClick={() => { setIsVacationModal(true) }}
                            className="flex-1 flex flex-col items-center gap-2 rounded-2xl border border-blue-100 bg-blue-50/40 p-4 text-blue-600 transition-all hover:bg-blue-50 active:scale-95"
                        >
                            <Plane size={20} />
                            <span className="text-[11px] font-bold">
                                {shopStatus.status === '휴가 중' ? '일정 수정' : '장기 휴가'}
                            </span>
                        </button>
                    </div>
                </section>

                <footer className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                    <p className="text-[11px] leading-relaxed text-slate-500">
                        💡 <b>알림:</b> 주간 설정은 저장 즉시 다음 영업 주기부터 반영됩니다. 오늘만 예외적으로 일찍 닫으실 경우 <b>조기 마감</b> 기능을 권장합니다.
                    </p>
                </footer>
            </div>
            <VacationModal open={isVacationModal} onClose={() => setIsVacationModal(false)} onSubmit={handleVacationSubmit} />
        </>
    )
}