{/* TODO 여기는 멍패스로 큐알 한 일별 매출 통계 그래프로 하면됨 몇마리 인지하고  */}
import { BarChart3, CalendarDays, ChevronDown, CircleDollarSign, Dog, TrendingUp } from 'lucide-react'

export default function StatsPage() {
    // 목업
    const summaryCards = [
        {
            id: 1,
            title: '이번 달 총 매출',
            value: '₩2,480,000',
            change: '+12.4%',
            icon: CircleDollarSign,
        },
        {
            id: 2,
            title: '이번 달 총 체크인',
            value: '186건',
            change: '+8.1%',
            icon: Dog,
        },
        {
            id: 3,
            title: '일 평균 방문',
            value: '6.2마리',
            change: '+4.3%',
            icon: TrendingUp,
        },
    ]

    const chartData = [
        { day: '03.17', sales: 12, visits: 5 },
        { day: '03.18', sales: 18, visits: 7 },
        { day: '03.19', sales: 10, visits: 4 },
        { day: '03.20', sales: 24, visits: 9 },
        { day: '03.21', sales: 20, visits: 8 },
        { day: '03.22', sales: 14, visits: 5 },
        { day: '03.23', sales: 28, visits: 10 },
    ]

    const maxSales = Math.max(...chartData.map((item) => item.sales))

    const topDays = [
        { id: 1, label: '최고 매출일', value: '03.23', subValue: '₩420,000' },
        { id: 2, label: '최다 방문일', value: '03.23', subValue: '10마리' },
        { id: 3, label: '평균 객단가', value: '₩13,300', subValue: '체크인 1건 기준' },
    ]

    return (
        <main className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="mx-auto flex max-w-7xl flex-col gap-6">
                <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-4 ">
                        <div>
                            <div className="flex items-center gap-2 text-orange-500">
                                <BarChart3 size={18} />
                                <p className="text-sm font-medium">실적 통계</p>
                            </div>
                            <h1 className="mt-2 text-2xl font-bold text-gray-900">매장 이용 현황과 매출 흐름</h1>
                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                체크인 수와 일별 매출 흐름을 한눈에 보고, 운영 추이를 빠르게 확인할 수 있어요.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                type="button"
                                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                            >
                                <CalendarDays size={16} />
                                2026년 3월
                                <ChevronDown size={16} />
                            </button>

                            <button
                                type="button"
                                className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
                            >
                                리포트 보기
                            </button>
                        </div>
                    </div>
                </section>

                <section className="grid gap-4">
                    {summaryCards.map((card) => {
                        const Icon = card.icon

                        return (
                            <article
                                key={card.id}
                                className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">{card.title}</p>
                                        <p className="mt-3 text-2xl font-bold text-gray-900">{card.value}</p>
                                    </div>

                                    <div className="rounded-2xl bg-orange-50 p-3 text-orange-500">
                                        <Icon size={20} />
                                    </div>
                                </div>

                                <p className="mt-4 text-sm font-semibold text-emerald-600">전월 대비 {card.change}</p>
                            </article>
                        )
                    })}
                </section>

                <section className="grid gap-6">
                    <article className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">일별 매출 추이</h2>
                                <p className="mt-1 text-sm text-gray-500">최근 7일 기준으로 매출 흐름을 확인할 수 있어요.</p>
                            </div>
                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                                최근 7일
                            </span>
                        </div>

                        <div className="mt-8">
                            <div className="flex h-72 items-end gap-3">
                                {chartData.map((item) => {
                                    const height = `${(item.sales / maxSales) * 100}%`

                                    return (
                                        <div key={item.day} className="flex flex-1 flex-col items-center gap-3">
                                            <div className="flex h-full w-full items-end">
                                                <div className="w-full rounded-t-2xl bg-orange-400/90" style={{ height }} />
                                            </div>
                                            <div className="text-center">
                                                <p className="text-xs font-semibold text-gray-700">{item.day}</p>
                                                <p className="mt-1 text-[11px] text-gray-400">{item.visits}건</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </article>

                    <article className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-900">핵심 지표</h2>
                        <p className="mt-1 text-sm text-gray-500">이번 달 운영 흐름에서 눈여겨볼 수치예요.</p>

                        <div className="mt-5 space-y-3">
                            {topDays.map((item) => (
                                <div key={item.id} className="rounded-2xl bg-gray-50 p-4">
                                    <p className="text-xs font-medium text-gray-500">{item.label}</p>
                                    <p className="mt-2 text-lg font-bold text-gray-900">{item.value}</p>
                                    <p className="mt-1 text-sm text-gray-500">{item.subValue}</p>
                                </div>
                            ))}
                        </div>
                    </article>
                </section>

                <section className="grid gap-6">
                    <article className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">요일별 방문 패턴</h2>
                                <p className="mt-1 text-sm text-gray-500">어느 요일에 방문이 몰리는지 빠르게 볼 수 있어요.</p>
                            </div>
                            <Dog size={18} className="text-orange-500" />
                        </div>

                        <div className="mt-5 space-y-4">
                            {[
                                { day: '월요일', percent: '42%' },
                                { day: '화요일', percent: '58%' },
                                { day: '수요일', percent: '36%' },
                                { day: '목요일', percent: '63%' },
                                { day: '금요일', percent: '81%' },
                            ].map((item) => (
                                <div key={item.day}>
                                    <div className="flex items-center justify-between text-sm font-medium text-gray-700">
                                        <span>{item.day}</span>
                                        <span>{item.percent}</span>
                                    </div>
                                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
                                        <div className="h-full rounded-full bg-orange-400" style={{ width: item.percent }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </article>

                    <article className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">최근 메모</h2>
                                <p className="mt-1 text-sm text-gray-500">운영 현황을 보며 참고할 만한 노트를 남겨둘 수 있어요.</p>
                            </div>
                            <TrendingUp size={18} className="text-orange-500" />
                        </div>

                        {/* //TODO 여기서 ai를 들이까?  */}
                        <div className="mt-5 rounded-2xl bg-gray-50 p-4 text-sm leading-7 text-gray-600">
                            주말 체크인 수가 평일보다 확실히 높고, 금요일 이후 매출 상승폭이 크게 나타나고 있어요.
                            향후에는 주말 피크 시간대 예약 관리와 추가 상품 제안을 함께 보면 좋아요.
                        </div>
                    </article>
                </section>
            </div>
        </main>
    )
}