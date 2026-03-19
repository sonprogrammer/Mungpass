'use client'
import { UsageTabsProps } from "@/features/owner/model/type";
import { LoginOutlined } from "@ant-design/icons";
import { ClipboardCheck } from "lucide-react";



export function UsageTabs({ activeTab, onChange, currentCount, checkoutCount }: UsageTabsProps) {

    return (
        <div className="w-full rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
            <div className="grid grid-cols-2 gap-2">
                <button className={`group flex items-center gap-3 rounded-2xl px-2 py-1 text-left transition-all duration-200
                        ${activeTab === 'current'
                            ? 'bg-emerald-50 ring-1 ring-emerald-200 shadow-sm'
                            : 'bg-white hover:bg-slate-50'
                        }`}
                    onClick={() => onChange('current')}
                >
                    <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-all
                            ${activeTab === 'current'
                                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-100'
                                : 'bg-slate-100 text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-600'
                            }`}
                    >
                        <ClipboardCheck className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                            <span
                                className={`truncate text-sm font-bold tracking-tight
                                ${activeTab === 'current'
                                        ? 'text-emerald-700'
                                        : 'text-slate-700'
                                }`}
                            >
                                실시간 이용 현황
                            </span>

                            <span
                                className={`inline-flex min-w-5.5 items-center justify-center rounded-full px-2 py-0.5 text-[11px] font-bold
                                ${activeTab === 'current'
                                        ? 'bg-emerald-500 text-white'
                                        : 'bg-slate-100 text-slate-500'
                                }`}
                            >
                                {currentCount}
                            </span>
                        </div>


                    </div>
                </button>
                <button
                    type="button"
                    onClick={() => onChange('checkout')}
                    className={`group flex items-center gap-3 rounded-2xl px-2 py-1 text-left transition-all duration-200
                    ${activeTab === 'checkout'
                            ? 'bg-red-50 ring-1 ring-red-200 shadow-sm'
                            : 'bg-white hover:bg-slate-50'
                    }`}
                >
                    <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-all
                        ${activeTab === 'checkout'
                                ? 'bg-red-500 text-white shadow-md shadow-red-100'
                                : 'bg-slate-100 text-slate-500 group-hover:bg-orange-50 group-hover:text-red-500'
                        }`}
                    >
                        <LoginOutlined className="text-[18px]" />
                    </div>

                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                            <span
                                className={`truncate text-sm font-bold tracking-tight
                                ${activeTab === 'checkout'
                                        ? 'text-red-700'
                                        : 'text-slate-700'
                                }`}
                            >
                                퇴실 현황
                            </span>

                            <span
                                className={`inline-flex min-w-5.5 items-center justify-center rounded-full px-2 py-0.5 text-[11px] font-bold
                                ${activeTab === 'checkout'
                                        ? 'bg-red-500 text-white'
                                        : 'bg-slate-100 text-slate-500'
                                }`}
                            >
                                {checkoutCount}
                            </span>
                        </div>

                        <p className="mt-1 text-xs text-slate-400">
                            오늘 기준 퇴실 내역
                        </p>
                    </div>
                </button>
            </div>
        </div>
    )
}