'use client'

import { StoreNoticeModalProps } from "@/features/owner/my-store/notices/model/types"
import { useSaveNotice } from "@/features/owner/my-store/notices/model/useSaveNotice"
import { App, Button, Divider, Form, Input, Modal, Switch } from "antd"
import { Save, X } from "lucide-react"
import { useEffect } from "react"


export function StoreNoticeModal({ shopId, isOpen, onClose, selectedNotice }: StoreNoticeModalProps) {
    const [form] = Form.useForm()
    const { mutate: saveNotice, isPending: saving } = useSaveNotice()
    const {message} = App.useApp()

    useEffect(() => {
        if (isOpen) {
            if (selectedNotice) {
                form.setFieldsValue({
                    title: selectedNotice.title,
                    content: selectedNotice.content,
                    is_show: selectedNotice.is_show
                })
            } else {
                form.resetFields()
            }
        }
    }, [isOpen, selectedNotice, form])

    const handleSave = (values: { is_show: boolean; title: string; content: string; }) => {
        saveNotice({
            shopId,
            noticeId: selectedNotice?.id,
            postData: {
                title: values.title,
                content: values.content,
                is_show: values.is_show
            }
        }, {
            onSuccess: () => {
                message.success('공지사항이 등록되었습니다.')
                onClose()
                form.resetFields()
            }
        })
    }

    return (
        <Modal
            title={
                <div className="pb-2">
                    <h2 className="text-xl font-bold text-gray-900">
                        {selectedNotice ? '공지사항 수정' : '새 공지사항 등록'}
                    </h2>
                </div>
            }
            open={isOpen}
            onCancel={onClose}
            footer={null}
            centered
            width={500}
            closeIcon={<X size={20} className="text-gray-400" />}
            className="custom-modal"
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSave}
                className="mt-4!"
                initialValues={{ is_show: true }}
            >
                <div className="space-y-5">

                    <Form.Item
                        label={<span className="font-bold text-gray-700">유저 앱 노출 여부</span>}
                        name="is_show"
                        valuePropName="checked" 
                    >
                        <Switch checkedChildren="노출중" unCheckedChildren="숨김" />
                    </Form.Item>

                    <Form.Item
                        label={<span className="font-bold text-gray-700">공지 제목</span>}
                        name="title"
                        rules={[{ required: true, message: '공지 제목을 입력해주세요' }]}
                    >
                        <Input placeholder="예시: 이번 주 운영 안내" className="h-12 rounded-xl border-gray-200" />
                    </Form.Item>

                    <Form.Item
                        label={<span className="font-bold text-gray-700">공지 내용</span>}
                        name="content"
                        rules={[{ required: true, message: '내용을 입력해주세요' }]}
                    >
                        <Input.TextArea
                            placeholder="보호자님들께 전달할 상세 내용을 입력하세요."
                            rows={6}
                            className="rounded-xl! border-gray-200! p-4! resize-none!"
                            required={true}
                        />
                    </Form.Item>
                </div>

                <Divider className="my-6" />

                <div className="flex gap-3">
                    <Button
                        size="large"
                        className="flex-1! h-12! rounded-xl! font-bold! border-gray-200! "
                        onClick={onClose}
                    >
                        취소
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        loading={saving}
                        icon={<Save size={18} />}
                        className="flex-1! h-12! rounded-xl! bg-emerald-500! font-bold! hover:bg-emerald-700!"
                    >
                        공지사항 저장하기
                    </Button>
                </div>
            </Form>
        </Modal>
    )
}