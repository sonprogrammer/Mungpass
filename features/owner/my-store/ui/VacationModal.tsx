'use client'
import { Modal, DatePicker, Form, Input } from 'antd';
import { Plane } from 'lucide-react';
import dayjs from 'dayjs';
import { VacationModalProps } from '@/features/owner/my-store/model/types';

const { RangePicker } = DatePicker;



export function VacationModal({ open, onClose, onSubmit }: VacationModalProps) {
    const [form] = Form.useForm()

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields()
            
            const formattedValues = {
                start_date: values.dates[0].format('YYYY-MM-DD'),
                end_date: values.dates[1].format('YYYY-MM-DD'),
                reason: values.reason,
                updated_at: new Date().toISOString()
            }
            onSubmit(formattedValues)
            form.resetFields()
            onClose()
        } catch (error) {
            console.log('Validate Failed:', error)
        }
    }

    return (
        <Modal
            title={
                <div className="flex items-center gap-2">
                    <Plane size={18} className="text-blue-500" />
                    <span>장기 휴가 일정 설정</span>
                </div>
            }
            open={open}
            onOk={handleSubmit}
            onCancel={onClose}
            okText="등록하기"
            cancelText="취소"
            centered
            destroyOnHidden
        >
            <div className="py-4">
                <Form form={form} layout="vertical" initialValues={{ reason: '개인 사정으로 인한 임시 휴무입니다.' }}>
                    
                    <Form.Item
                        name="dates"
                        label="휴가 기간"
                        rules={[{ required: true, message: '휴가 기간을 선택해주세요!' }]}
                    >
                        <RangePicker 
                            className="w-full" 
                            disabledDate={(current) => current && current < dayjs().startOf('day')}
                            placeholder={['시작일', '종료일']}
                        />
                    </Form.Item>

                  
                    <Form.Item
                        name="reason"
                        label="휴가 사유 (손님에게 노출됩니다)"
                        rules={[{ required: true, message: '사유를 입력해주세요!' }]}
                    >
                        <Input.TextArea 
                            placeholder="예: 내부 수리 공사로 인해 쉽니다. 8월 5일에 만나요!" 
                            rows={3} 
                            className='resize-none!'
                        />
                    </Form.Item>
                </Form>
                
                <p className="text-[12px] text-gray-400 bg-gray-50 p-3 rounded-lg">
                    💡 <b>안내:</b> {`설정된 기간 동안은 요일별 영업시간과 상관없이 매장이 '휴가 중'으로 표시되며, 기간이 지나면 자동으로 원래 스케줄로 복구됩니다.`}
                </p>
            </div>
        </Modal>
    )
}