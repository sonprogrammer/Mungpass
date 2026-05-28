'use client'

import { Button, Form, FormInstance, Input } from "antd"

interface FormState {
    reply: string;

}


interface InquiryReplyFormProps {
    form: FormInstance<FormState>;
    onFinish: (values: { reply: string }) => void
    loading: boolean
}

export function InquiryReplyForm({ form, onFinish, loading }: InquiryReplyFormProps) {
    return (
        <Form
            form={form}
            onFinish={onFinish}
            layout="inline"
            style={{
                width: "100%",
                display: "flex",
                alignItems: "flex-end",
            }}
        >
            <Form.Item
                name="reply"
                rules={[{ required: true, message: "메시지를 입력하세요." }]}
                style={{ flex: 1, marginRight: "8px" }}
            >
                <Input.TextArea
                    rows={2}
                    autoSize={{ minRows: 2, maxRows: 4 }}
                    placeholder="답변 내용을 입력하세요."
                    onPressEnter={(e) => {
                        if (e.nativeEvent.isComposing) return
                        if (!e.shiftKey) {
                            e.preventDefault();
                            form.submit();
                        }
                    }}
                />

            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    style={{ height: "54px", fontWeight: "bold" }}
                >
                    전송
                </Button>
            </Form.Item>
        </Form>
    )
}