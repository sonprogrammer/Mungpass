export function StoreDocCard() {
    return(
        <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">제출한 서류</h2>
                                    <p className="mt-1 text-sm text-gray-500">
                                        업로드한 서류를 확인하고 필요 시 다시 제출할 수 있어요.
                                    </p>
                                </div>
                                <button className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700">
                                    서류 재제출
                                </button>
                            </div>

                            <div className="mt-5 space-y-3">
                                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                                    <div className="flex items-center justify-between gap-3">
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">business-license.pdf</p>
                                            <p className="mt-1 text-xs text-gray-500">업로드일: 2026.03.10</p>
                                        </div>
                                        <button className="text-sm font-medium text-orange-500">보기</button>
                                    </div>
                                </div>
                                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                                    <div className="flex items-center justify-between gap-3">
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">sales-report.jpg</p>
                                            <p className="mt-1 text-xs text-gray-500">업로드일: 2026.03.12</p>
                                        </div>
                                        <button className="text-sm font-medium text-orange-500">보기</button>
                                    </div>
                                </div>
                                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                                    <div className="flex items-center justify-between gap-3">
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">bank-account-copy.png</p>
                                            <p className="mt-1 text-xs text-gray-500">업로드일: 2026.03.12</p>
                                        </div>
                                        <button className="text-sm font-medium text-orange-500">보기</button>
                                    </div>
                                </div>
                            </div>
                        </article>
    )
}