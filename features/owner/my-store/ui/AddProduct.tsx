'use client'

import { Button, Form, Input, InputNumber, Space, Typography } from "antd";
import { HelpCircle, AlarmClockCheck, Save, ChevronLeft, CircleDollarSign } from "lucide-react";

export function AddProduct({ add, setAddModal }: { add: (values: any) => void; setAddModal: (isOpen: boolean) => void }) {
    const [form] = Form.useForm();
    return (
        <Form form={form} layout="vertical" onFinish={add} className="space-y-6!">
            <section className="space-y-4">
                <Form.Item
                    name="name"
                    label={<span className="text-[13px] font-bold text-slate-500 ml-1">상품명</span>}
                    rules={[{ required: true, message: '상품명을 입력해주세요' }]}
                >
                    <Input placeholder="예: 유치원 12시간" className="h-14! rounded-2xl! bg-slate-50! border-none! px-5! font-bold! text-slate-700! focus:bg-white! focus:ring-2! focus:ring-orange-100 transition-all" />
                </Form.Item>

                <div className="grid grid-cols-2 gap-4">
                    <Form.Item name="duration" label={<span className="text-[13px] font-bold text-slate-500 ml-1 flex items-center gap-1"><AlarmClockCheck size={14} className="text-blue-400" /> 기본 시간(분)</span>}>
                        <InputNumber min={0}  placeholder="60" className="w-full! h-14 rounded-2xl! bg-slate-50! border-none! flex! items-center! px-2! font-bold!" />
                    </Form.Item>
                    <Form.Item name="price" label={<span className="text-[13px] font-bold text-slate-500 ml-1 flex items-center gap-1"><CircleDollarSign size={14} className="text-green-400" /> 기본 가격(원)</span>}>
                        <InputNumber min={0} step={1000} placeholder="10,000" className="w-full! h-14! rounded-2xl! bg-slate-50! border-none! flex! items-center! px-2! font-bold!" />
                    </Form.Item>
                </div>

                <div className="p-6 rounded-4xl bg-orange-50/50 border border-orange-100/50 space-y-4">
                    <div className="flex items-center justify-between text-orange-600">
                        <Space direction="vertical" size={0} className="text-[13px]! font-black! flex! flex-col! ">
                            <Typography.Text className="text-orange-500!">추가 요금 설정</Typography.Text>
                           <Typography.Text className="flex items-center gap-1 text-slate-500! text-[10px]!"><HelpCircle size={12} /> 설정하지 않으면 추가 요금이 적용되지 않습니다.</Typography.Text> 
                        </Space>
                        <span className="text-[10px] font-bold bg-white px-2 py-1 rounded-full border border-orange-100 shadow-sm">선택 사항</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <Form.Item name="extraMinute" className="mb-0!">
                            <InputNumber placeholder="10분당" className="w-full! h-12! flex! items-center! rounded-xl! border-none! font-bold!" />
                        </Form.Item>
                        <Form.Item name="extraPrice" className="mb-0!">
                            <InputNumber placeholder="1,000원 추가" className="w-full! h-12! flex! items-center! rounded-xl! border-none! font-bold!" />
                        </Form.Item>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-2 gap-3 pt-4 pb-10">
                <Button
                    onClick={() => setAddModal(false)}
                    className="h-14! rounded-3xl! border-slate-200! bg-slate-50! text-slate-500! font-bold! hover:text-slate-800! transition-all!"
                >
                    <ChevronLeft size={18} className="mr-1 inline" /> 취소
                </Button>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="h-14! rounded-3xl! bg-emerald-500! border-none! font-black! text-white! shadow-xl! shadow-slate-200! hover:bg-emerald-700! transition-all"
                >
                    <Save size={18} className="mr-2 inline" /> 저장하기
                </Button>
            </div>
        </Form>
    )
}