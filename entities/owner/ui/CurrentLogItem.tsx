'use client'

import { CurrentLogItemProps } from "@/entities/owner/model/types";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Avatar, Button, Tag, Typography } from "antd";
import { Dog } from "lucide-react";



export function CurrentLogItem({ item, onCheckout, onClick }: CurrentLogItemProps) {
    const isStaying = item.status === 'staying'
    const isCompleted = item.status === 'completed'


    return (
        <article
            className="rounded-3xl border border-emerald-100 bg-white p-4 w-full shadow-sm transition-all duration-200 hover:border-emerald-200 hover:shadow-md"
            role="button"
            tabIndex={0}
            onClick={() => onClick?.(item)}
        >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-3">
                        <Avatar
                            src={item.dog?.image_url ?? undefined}
                            size={52}
                            icon={<Dog size={20} className="text-emerald-700" />}
                            className="shrink-0 border border-emerald-100 bg-emerald-50!"
                        />

                        <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <Typography.Text strong className="text-base! text-slate-800!">
                                    {item.dog?.name}
                                </Typography.Text>

                                {/* TODO 상품에 따라 색상 다르게  */}
                                <Tag color="green" className="m-0! rounded-full px-2 py-0 text-[11px]!">
                                    {item.product?.name}
                                </Tag>

                                {!isStaying && (
                                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold 
                                            ${item.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}
                                    `}>
                                        {isCompleted ? '퇴실 완료' : '취소'}
                                    </span>
                                ) }
                            </div>

                            <div className="mt-1 flex flex-col gap-1">
                                <Typography.Text type="secondary" className="text-xs!">
                                    품종 : {item.dog?.breed}
                                </Typography.Text>

                                {item.owner?.name && (
                                    <Typography.Text type="secondary" className="text-xs!">
                                        보호자 : {item.owner?.name}
                                    </Typography.Text>
                                )}

                                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400">
                                    <div className="flex items-center gap-1">
                                        <ClockCircleOutlined className="text-[11px]" />
                                        <span>
                                            {isStaying
                                                ? `${item.started_at} 입실`
                                                : item.ended_at === null ? '' :`${item.ended_at} 퇴실`}
                                            
                                        </span>
                                    </div>

                                    <span className="hidden sm:inline text-[10px]">|</span>

                                    <span className="font-semibold text-blue-500">
                                        {/* //TODO 여기도 실시간으로 변경해줘야함  계산하는 로직으로 */}
                                        {/* TODO 현재는 그냥 상품 시간 적혀있ㅇ므 */}
                                        {item.product?.duration_minutes} 경과
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {isStaying && (

                    <div className="flex w-full sm:w-auto">
                        <Button
                            type="default"
                            danger
                            ghost
                            className="w-full rounded-xl font-medium! sm:w-auto"
                            onClick={(e) => {
                                e.stopPropagation()
                                onCheckout?.(item)
                            }}
                        >
                            퇴실 처리
                        </Button>
                    </div>
                )}
            </div>
        </article>
    )
}