export function StoreApprovalStatusCard() {
    return (
        <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">사업자 승인 현황</h2>
            <p className="mt-1 text-sm text-gray-500">
                사업자 등록 및 매장 승인을 위한 현재 진행 상태를 확인할 수 있어요.
            </p>

            <div className="mt-5 rounded-2xl bg-amber-50 p-4">
                <p className="text-xs font-medium text-amber-600">현재 상태</p>
                <p className="mt-2 text-xl font-bold text-gray-900">승인 대기 중</p>
                <p className="mt-2 text-sm text-gray-600">
                    관리자 검토가 진행 중이며, 추가 서류가 필요하면 알림으로 안내돼요.
                </p>
            </div>

            <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between rounded-xl border border-gray-100 p-4">
                    <span className="text-sm font-medium text-gray-700">사업자 등록증</span>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">제출 완료</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-gray-100 p-4">
                    <span className="text-sm font-medium text-gray-700">영업 신고증</span>
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-600">검토 중</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-gray-100 p-4">
                    <span className="text-sm font-medium text-gray-700">통장 사본</span>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">제출 완료</span>
                </div>
            </div>
        </article>
    )

}