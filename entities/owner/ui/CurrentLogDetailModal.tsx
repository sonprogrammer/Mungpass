'use client'
import { CurrentLogDetailModalProps } from '@/entities/owner/model'
import { formatTime, getElapsedTime } from '@/shared/utils'
import { Avatar, Button, Modal, Tag, Typography } from 'antd'
import { ClockArrowUp, Dog, ClockArrowDown } from 'lucide-react'


export function CurrentLogDetailModal({ open, item, onClose, onCheckout }: CurrentLogDetailModalProps) {
    const isStaying = item?.status === 'staying'
    const isCompleted = item?.status === 'completed'
    const isCancelled = item?.status === 'cancelled'

    const checkedInTime = item?.started_at
    const checkOutTime = item?.ended_at
    // * 경과 시간
    const pastTime = getElapsedTime(checkedInTime, checkOutTime)

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            centered
            title={<span className='font-black'>이용 상세 정보</span>}
        >
            {item && (
                <div className="flex flex-col gap-4 pt-2">
                    <div className="flex items-start gap-3">
                        <Avatar
                            src={item.dog?.image_url}
                            size={56}
                            icon={<Dog size={22} className="text-orange-500" />}
                            className="shrink-0 border border-orange-100 bg-orange-50!"
                        />

                        <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <Typography.Text strong className="text-base! text-slate-800!">
                                    {item.dog?.name}
                                </Typography.Text>

                                <Tag color="orange" className="m-0! text-[10px]!">
                                    {item.product?.name}
                                </Tag>


                                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold 
                                        ${isStaying ? 'bg-orange-50 text-orange-500' :
                                        isCompleted ? 'bg-emerald-50 text-emerald-600' :
                                            'bg-slate-100 text-red-500'}`}>
                                        {isStaying ? '이용 중' : isCompleted ? '퇴실 완료' : '취소됨'}
                                </span>
                            </div>

                            <Typography.Text type="secondary" className="mt-1 text-xs! block">
                                품종 : {item.dog?.breed}
                            </Typography.Text>

                            {item.owner?.name && (
                                <Typography.Text type="secondary" className="text-xs! block">
                                    보호자 : {item.owner?.name}
                                </Typography.Text>
                            )}
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                        {!isCancelled && (
                            <div className="flex flex-col gap-1.5">

                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <ClockArrowUp size={14} className="text-emerald-500" />
                                    <span>{formatTime(item.started_at)} 입실</span>
                                </div>

                                {/* //*퇴실 시간*/}
                                {isCompleted && (
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <ClockArrowDown size={14} className="text-red-400" />
                                        <span>{formatTime(item.ended_at)} 퇴실</span>
                                    </div>
                                )}

                                {/* //*경과 시간 및 완료시간 */}
                                <Typography.Text className="mt-1 block text-sm! text-blue-500! font-semibold">
                                    <span>
                                        {pastTime}
                                    </span>
                                </Typography.Text>
                            </div>
                        )}

                        {isCancelled && (
                            <div className="text-sm text-slate-400 italic">
                                취소된 이용 기록입니다.
                            </div>
                        )}
                    </div>

                    {isStaying && (

                        <div className="flex gap-2">
                            <Button onClick={onClose} className="flex-1">
                                닫기
                            </Button>

                            <Button
                                danger
                                ghost
                                className="flex-1 font-medium!"
                                onClick={() => onCheckout?.(item)}
                            >
                                퇴실 처리
                            </Button>
                        </div>
                    )}
                </div>
            )}

        </Modal>
    )
}