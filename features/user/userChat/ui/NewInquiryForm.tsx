'use client'

import { InquiryCategory } from "@/entities/inquiry/model"
import { Button, Form, Input, Select } from "antd"

const CATEGORY_LABELS: Record<InquiryCategory, string> = {
    payout: '정산 및 수익',
    policy: '운영 정책/승인',
    system: '시스템 오류',
    refund: '환불 문의',
    use_history: '이용 내역 문의',
    etc: '기타 문의'
}

interface NewInquiryFormProps {
    onFinish: (values: { category: InquiryCategory, title: string, content: string }) => void
    isSubmitting: boolean;
    onCancel: () => void
}

export function NewInquiryForm({ onFinish, isSubmitting, onCancel }: NewInquiryFormProps) {
    const [form] = Form.useForm()

    return (
        <Form form={form} layout='vertical' onFinish={onFinish} className="mt-4!">
            <Form.Item label="문의 유형" name="category" rules={[{ required: true, message: '문의 유형을 선택해주세요' }]}>
                <Select
                    placeholder='분류를 선택해주세요'
                    options={Object.entries(CATEGORY_LABELS).map(([key, value]) => ({
                        value: key,
                        label: value
                    }))}
                    className="h-11!"
                />
            </Form.Item>
            <Form.Item label="제목" name='title' rules={[{ required: true, message: '제목을 입력해주세요' }]}>
                <Input placeholder="제목을 입력하세요" className="h-11! rounded-xl!" />
            </Form.Item>
            <Form.Item label='문의 내용' name='content' rules={[{ required: true, message: '내용을 입력해주세요' }]}>
                <Input.TextArea placeholder="상세 내용을 입력해주세요" rows={4} className="rounded-xl! p-4! resize-none!" />
            </Form.Item>

            <div className="flex gap-3 mt-6">
                <Button size="large" className="flex-1 rounded-xl" onClick={onCancel}>취소</Button>
                <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={isSubmitting}
                    className="flex-1 rounded-xl bg-orange-500! font-bold! border-none! hover:bg-orange-600!"
                >
                    접수하기
                </Button>
            </div>
        </Form>
    )
}