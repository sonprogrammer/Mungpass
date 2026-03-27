'use client'

import { TrendingUp } from "lucide-react";

export function InsightCard({ title, value, change }: { title: string; value: string; change: string }) {
    return (
        <section>
            <article className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <h2 className="text-lg font-black text-gray-900 leading-tight">멍패스 AI 리포트</h2>
                        <p className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Smart Insights</p>
                    </div>
                    <TrendingUp size={20} className="text-orange-500" />
                </div>

                {/* //TODO grok ai로 일마다 데이터를 분석해서 두세문장 인사이트 문구 만들어주기  */}
                <div className="mt-5 rounded-2xl bg-gray-50 p-4 text-sm leading-7 text-gray-600">
                    주말 체크인 수가 평일보다 확실히 높고, 금요일 이후 매출 상승폭이 크게 나타나고 있어요.
                    향후에는 주말 피크 시간대 예약 관리와 추가 상품 제안을 함께 보면 좋아요.
                </div>
            </article>
        </section>
    )
}