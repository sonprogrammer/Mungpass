import { CurrentLogItemProps } from "@/entities/owner/model/types";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Avatar, Button, Tag, Typography } from "antd";
import { Dog } from "lucide-react";



export function CurrentLogItem({ item, onCheckout }: CurrentLogItemProps) {
    return (
        <article className="rounded-3xl border border-emerald-100 bg-white p-4 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:shadow-md">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-3">
                        <Avatar
                            src={item.petImage ?? undefined}
                            size={52}
                            icon={<Dog size={20} />}
                            className="shrink-0 border border-emerald-100 bg-emerald-50!"
                        />

                        <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <Typography.Text strong className="text-base! text-slate-800!">
                                    {item.petName}
                                </Typography.Text>

                                <Tag color="green" className="m-0! rounded-full px-2 py-0 text-[11px]!">
                                    {item.type}
                                </Tag>

                                <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-600">
                                    {item.status ?? '이용중'}
                                </span>
                            </div>

                            <div className="mt-1 flex flex-col gap-1">
                                <Typography.Text type="secondary" className="text-xs!">
                                    품종 : {item.breed}
                                </Typography.Text>

                                {item.ownerName && (
                                    <Typography.Text type="secondary" className="text-xs!">
                                        보호자 : {item.ownerName}
                                    </Typography.Text>
                                )}

                                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400">
                                    <div className="flex items-center gap-1">
                                        <ClockCircleOutlined className="text-[11px]" />
                                        <span>{item.startTime} 입실</span>
                                    </div>

                                    <span className="hidden sm:inline text-[10px]">|</span>

                                    <span className="font-semibold text-blue-500">
                                        {item.duration} 경과
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex w-full sm:w-auto">
                    <Button
                        type="default"
                        danger
                        ghost
                        className="w-full rounded-xl font-medium! sm:w-auto"
                        onClick={() => onCheckout?.(item)}
                    >
                        퇴실 처리
                    </Button>
                </div>
            </div>
        </article>
    )
}