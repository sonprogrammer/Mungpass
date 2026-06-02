'use client'

import { ChevronLeft, Save } from 'lucide-react'
import { Button, TimePicker, Form, Switch } from 'antd'
import {  StoreTimeEditViewProps } from '@/features/owner/my-store/model'
import { DAYS } from '@/features/owner/my-store/lib'



export function StoreTimeEditView({ form, onSave, onBack, loading }: StoreTimeEditViewProps) {
    return (
        <div className="flex flex-col h-full animate-in slide-in-from-right-6 duration-400">
            <div className="flex items-center justify-between mb-6">
                <button onClick={onBack} className="cursor-pointer p-2 -ml-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <ChevronLeft size={24} />
                </button>
                <h2 className="text-lg font-extrabold text-gray-900">주간 영업 설정</h2>
                <div className="w-10" />
            </div>

            <Form form={form} onFinish={onSave} layout="horizontal" className="flex-1! flex! flex-col! h-full! min-h-0! overflow-y-auto!">
                
                <div className="flex-1 overflow-y-auto min-h-0 space-y-3">
                    {DAYS.map((day) => (
                        <div key={day.value} className="flex flex-col gap-3 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-gray-800 text-sm">{day.label}요일 운영</span>
                                <Form.Item name={[day.value, 'is_closed']} valuePropName="checked" noStyle>
                                    <Switch 
                                        checkedChildren="휴무" 
                                        unCheckedChildren="영업" 
                                        />
                                </Form.Item>

                            </div>
                            
                            <Form.Item noStyle shouldUpdate={(prev, curr) => prev[day.value]?.is_closed !== curr[day.value]?.is_closed}>
                                {({ getFieldValue }) => !getFieldValue([day.value, 'is_closed']) && (
                                    <div className="flex gap-2 items-center animate-in zoom-in-95 duration-300">
                                        <Form.Item name={[day.value, 'open']} noStyle>
                                            <TimePicker 
                                                format="HH:mm" 
                                                suffixIcon={null} 
                                                className="flex-1 h-12 rounded-xl border-gray-100 bg-gray-50 font-medium text-center" 
                                                placeholder="오픈 시간" 
                                                allowClear={false}
                                            />
                                        </Form.Item>
                                        <span className="text-gray-300">~</span>
                                        <Form.Item name={[day.value, 'close']} noStyle>
                                            <TimePicker 
                                                format="HH:mm" 
                                                suffixIcon={null} 
                                                className="flex-1 h-12 rounded-xl border-gray-100 bg-gray-50 font-medium text-center" 
                                                placeholder="마감 시간"
                                                allowClear={false} 
                                            />
                                        </Form.Item>
                                    </div>
                                )}
                            </Form.Item>
                        </div>
                    ))}
                </div>

          
                <div className="pt-6 pb-2 bg-white">
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        block 
                        loading={loading}
                        size="large" 
                        icon={<Save size={18} />}
                        className="h-14 rounded-2xl bg-gray-900 hover:bg-gray-800! border-none font-bold shadow-lg shadow-gray-200 mb-3"
                    >
                        설정 저장하기
                    </Button>
                </div>
            </Form>
        </div>
    )
}