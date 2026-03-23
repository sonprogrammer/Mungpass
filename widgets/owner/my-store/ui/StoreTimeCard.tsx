'use client'

import { useState } from 'react'
import { Clock3, ChevronRight, Edit3, Save, Power, AlertCircle } from 'lucide-react'
import { Button, Tag, Drawer, TimePicker, Form, message } from 'antd'
import dayjs from 'dayjs'

export function StoreTimeCard() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    // 목업
    const [operationTime, setOperationTime] = useState({
        open: '09:00',
        close: '20:00'
    })

    const handleSave = (values: any) => {
        const openTime = values.open.format('HH:mm')
        const closeTime = values.close.format('HH:mm')

        setOperationTime({ open: openTime, close: closeTime })
        message.success('영업 시간이 수정되었습니다.')
        setIsDrawerOpen(false)
    }

    return (
        <>
            <article className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                            <Clock3 size={20} />
                        </div>
                        <div>
                            <h2 className="text-base font-bold text-gray-900">영업 시간 관리</h2>
                            <Tag color="success" className="m-0 border-none font-bold rounded-md">영업 중</Tag>
                        </div>
                    </div>

                    <Button
                        type="text"
                        onClick={() => setIsDrawerOpen(true)}
                        className="group text-gray-400 hover:text-orange-500"
                    >
                        <span className="text-sm font-medium">상세 설정</span>
                        <ChevronRight size={16} className="ml-1 inline transition-transform group-hover:translate-x-0.5" />
                    </Button>
                </div>


                <div className="mt-4 flex flex-col items-center gap-4 lg:flex-row">
                    <div
                        onClick={() => setIsDrawerOpen(true)}
                        className="group relative flex w-full cursor-pointer items-center gap-3 rounded-2xl bg-gray-50 p-3 transition hover:bg-gray-100 lg:w-auto"
                    >
                        <div className="flex w-full px-4 ">
                            <div className="flex-1 text-center">
                                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-tight">Open</p>
                                <p className="text-sm font-bold text-gray-900">{operationTime.open}</p>
                            </div>
                            <div className="h-8 w-px bg-gray-200 self-center" />
                            <div className="flex-1 text-center">
                                <p className="text-[10px] font-bold text-orange-500 uppercase tracking-tight">Close</p>
                                <p className="text-sm font-bold text-gray-900">{operationTime.close}</p>
                            </div>
                        </div>
                        <Edit3 size={14} className="text-orange-300 transition group-hover:text-orange-500 absolute top-3 right-3" />
                    </div>

                    <div className="flex w-full flex-1 gap-2">
                        <button
                            type="button"
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-rose-100 bg-white py-2.5 text-sm font-bold text-rose-500 transition hover:bg-rose-50 active:scale-95"
                        >
                            <Power size={14} />
                            오늘 즉시 휴무
                        </button>

                        <button
                            type="button"
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-amber-100 bg-white py-2.5 text-sm font-bold text-amber-600 transition hover:bg-amber-50 active:scale-95"
                        >
                            <AlertCircle size={14} />
                            조기 마감
                        </button>
                    </div>
                </div>
            </article>


            <Drawer
                title={<span className="font-bold text-lg">영업 시간 상세 설정</span>}
                placement="right"
                onClose={() => setIsDrawerOpen(false)}
                open={isDrawerOpen}
                width={380}
            >
                <Form
                    layout="vertical"
                    initialValues={{
                        open: dayjs(operationTime.open, 'HH:mm'),
                        close: dayjs(operationTime.close, 'HH:mm'),
                    }}
                    onFinish={handleSave}
                    className="space-y-6"
                >
                    <section>
                        <h3 className="mb-4 text-sm font-bold text-gray-900 flex items-center gap-2">
                            <span className="h-1 w-1 rounded-full bg-orange-500" /> 기본 영업 시간
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Form.Item name="open" label="오픈 시간" rules={[{ required: true }]}>
                                <TimePicker format="HH:mm" className="w-full h-11 rounded-xl" />
                            </Form.Item>
                            <Form.Item name="close" label="마감 시간" rules={[{ required: true }]}>
                                <TimePicker format="HH:mm" className="w-full h-11 rounded-xl" />
                            </Form.Item>
                        </div>
                    </section>

                    <section className="rounded-2xl bg-blue-50 p-4">
                        <p className="text-xs leading-5 text-blue-700">
                            💡 <b>Tip:</b> 기본 영업 시간을 수정하면 다음 날부터 적용됩니다. 오늘 즉시 변경사항은 메인 카드의 {' '}
                            <span className='underline font-black text-orange-500'>조기 마감</span> 을 이용해 주세요.
                        </p>
                    </section>

                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        block
                        icon={<Save size={18} />}
                        className="h-12 rounded-xl bg-gray-900 hover:bg-gray-800! flex items-center justify-center gap-2"
                    >
                        저장하기
                    </Button>
                </Form>
            </Drawer>
        </>
    )
}