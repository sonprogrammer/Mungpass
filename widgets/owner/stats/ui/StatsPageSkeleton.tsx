'use client'

import { Card, Skeleton, Space } from 'antd';

export function StatsPageSkeleton() {
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="mx-auto flex max-w-7xl flex-col gap-6">

                {/* //* 상단 */}
                <Card className="rounded-4xl border-none shadow-sm">
                    <div className="flex flex-col items-start gap-2">
                        <Space direction="vertical" size={4}>
                            <Skeleton.Input active size="small" style={{ width: 100 }} />
                            <Skeleton.Input active size="default" style={{ width: 300 }} />
                        </Space>
                        <div className="flex gap-2">
                            <Skeleton.Button active shape="default" style={{ width: 120, height: 45 }} />
                            <Skeleton.Button active shape="square" style={{ width: 100, height: 45 }} />
                        </div>
                    </div>
                </Card>

                {/* //* 차트 영역 */}
                <Card className="rounded-[2.5rem] border-none shadow-sm p-6">
                    <div className="flex justify-between items-center mb-10">
                        <Skeleton.Input active style={{ width: 150 }} />
                        <div className='flex gap-2'>
                            <Skeleton.Button active shape="round" style={{ width: 50 }} />
                            <Skeleton.Button active shape="round" style={{ width: 50 }} />
                        </div>
                    </div>
                    <div className="flex items-end justify-around h-62 w-full  px-4 mb-6">
                        {[30,20,30,40,50, 70,20].map((h, i) => (
                            <div key={i} className="flex flex-col items-center justify-end h-full gap-3"
                                style={{ width: `${100 / 7}%`}}
                            >
                                <div
                                    className="w-[70%] bg-slate-100 rounded-t-xl animate-pulse"
                                    style={{ height: `${h}%` }}
                                />
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="rounded-4xl border-none shadow-sm">
                    <Skeleton active title={{ width: '20%' }} paragraph={{ rows: 2 }} />
                </Card>
            </div>
        </div>
    );
}