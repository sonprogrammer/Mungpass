'use client'

import { ProductWithCategory, useDeleteProductCategory, useGetProductCategories, usePostProductCategory } from "@/features/owner/my-store/product/model"
import { App, Button, Divider, Form, Input, InputNumber, Select, Space, Switch, Typography } from "antd"
import { FormInstance } from "antd/lib"
import { AlarmClockCheck, ChevronLeft, CircleDollarSign, HelpCircle, LayoutGrid, Plus, Save, X } from "lucide-react"
import { useState } from "react"

interface ProductFormProps<T> {
    form: FormInstance;
    shopId: string;
    initialValues?: Partial<ProductWithCategory>
    onSubmit: (value: T) => void;
    onCancel: () => void;
    isPending: boolean;
}

export function ProductForm<T>({ form, shopId, initialValues, onSubmit, onCancel, isPending }: ProductFormProps<T>) {
    const [newCategoryName, setNewCategoryName] = useState('')

    const { message, modal } = App.useApp()

    // *카테고리 가져오기
    const { data: categoryData = [] } = useGetProductCategories(shopId)
    // * 카테고리 등록하기
    const { mutate: postCategory, isPending: isAddingCategory } = usePostProductCategory()
    // *카테고리 삭제하기
    const { mutate: deleteCategory } = useDeleteProductCategory()

    const handleAddCategory = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault()
        if (!newCategoryName.trim()) return message.warning('카테고리 이름을 입력해주세요')

        postCategory({ shopId, categoryName: newCategoryName }, {
            onSuccess: (newCategory) => {
                setNewCategoryName('')
                form.setFieldValue('category_id', newCategory.id)
            }
        })
    }

    const handleDeleteCategory = (e: React.MouseEvent, categoryId: string) => {
        e.stopPropagation()
        e.preventDefault()
        console.log('category', categoryId)

        modal.confirm({
            title: '카테고리 삭제',
            content: '이 카테고리를 삭제하시겠습니까? 연결된 상품은 미분류로 변경됩니다.',
            okText: '삭제',
            okType: 'danger',
            cancelText: '취소',
            centered: true,
            onOk: () => {
                deleteCategory({ categoryId, shopId }, {
                    onSuccess: () => {
                        message.success('카테고리가 삭제되었습니다.')
                        if (form.getFieldValue('category_id') === categoryId) {
                            form.setFieldsValue({ category_id: null })
                        }
                    }
                })
            }
        });
    }

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onSubmit}
            initialValues={{
                is_active: true, 
                ...initialValues
            }}
            className="flex flex-col h-full"
        >
            <section className="space-y-2 flex-1 overflow-y-auto pb-4 scrollbar-none">
                <Form.Item
                    name="category_id"
                    label={
                        <span className="text-[13px] font-bold text-slate-500 ml-1 flex items-center gap-1">
                            <LayoutGrid size={14} className="text-purple-400" />
                            카테고리
                        </span>}
                >
                    <Select
                        placeholder="카테고리를 선택하거나 추가하세요"
                        className="h-14! rounded-2xl! font-bold!"
                        options={categoryData.map(category => ({
                            value: category.id,
                            label: (
                                <div className="flex items-center justify-between group">
                                    <span className="font-medium text-slate-700">{category.name}</span>
                                    <Button
                                        type="text"
                                        size="small"
                                        className="opacity-0 group-hover:opacity-100 p-0 h-6 w-6 flex items-center justify-center rounded-full hover:bg-red-50!"
                                        onClick={(e) => handleDeleteCategory(e, category.id)}>
                                        <X size={14} className="text-slate-400 hover:text-red-500" />
                                    </Button>
                                </div>
                            )
                        }))}
                        popupRender={(menu) => (
                            <div onMouseDown={(e) => e.preventDefault()}>
                                {menu}
                                <Divider style={{ margin: '8px 4px' }} />
                                <Space.Compact className="w-full px-1 pb-1">
                                    <Input
                                        placeholder="새 카테고리"
                                        value={newCategoryName}
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                        onClick={(e) => e.stopPropagation()} className="h-10! rounded-l-xl!"
                                        onMouseDown={(e) => e.stopPropagation()}
                                        onKeyDown={(e) => e.stopPropagation()}
                                    />
                                    <Button
                                        type="primary"
                                        loading={isAddingCategory}
                                        icon={<Plus size={16} />}
                                        onClick={handleAddCategory}
                                        className="h-10! rounded-r-xl! bg-emerald-500!"
                                    >
                                        추가
                                    </Button>
                                </Space.Compact>
                            </div>
                        )}
                    />
                </Form.Item>

                <Form.Item
                    name="name"
                    label={<span className="text-[13px] font-bold text-slate-500 ml-1">상품명</span>}
                    rules={[{ required: true, message: '상품명을 입력해주세요' }]}
                >
                    <Input placeholder="예: 유치원 12시간" className="h-14! rounded-2xl! bg-slate-50! border-none! px-5! font-bold! text-slate-700! focus:bg-white! focus:ring-2! focus:ring-orange-100 transition-all" />
                </Form.Item>

                <div className="grid grid-cols-2 gap-4">
                    <Form.Item name="duration_minutes"
                        label={<span className="text-[13px] font-bold text-slate-500 ml-1 flex items-center gap-1">
                            <AlarmClockCheck size={14} className="text-blue-400" />
                            기본 시간(분)
                        </span>}>
                        <InputNumber min={0} placeholder="60" className="w-full! h-14 rounded-2xl! bg-slate-50! border-none! flex! items-center! px-2! font-bold!" />
                    </Form.Item>
                    <Form.Item name="price" label={<span className="text-[13px] font-bold text-slate-500 ml-1 flex items-center gap-1"><CircleDollarSign size={14} className="text-green-400" /> 기본 가격(원)</span>}>
                        <InputNumber min={0} step={1000} placeholder="10,000" className="w-full! h-14! rounded-2xl! bg-slate-50! border-none! flex! items-center! px-2! font-bold!" />
                    </Form.Item>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-slate-700">판매 상태</span>
                        <span className="text-[11px] text-slate-400">활성화 시 바로 판매가 시작됩니다.</span>
                    </div>
                    <Form.Item name="is_active" valuePropName="checked" className="mb-0">
                        <Switch checkedChildren="판매중" unCheckedChildren="숨김" />
                    </Form.Item>
                </div>

                <div className="p-6 rounded-4xl bg-orange-50/50 border border-orange-100/50 space-y-4">
                    <div className="flex items-center justify-between text-orange-600">
                        <Space direction="vertical" size={0} className="text-[13px]! font-black! flex! flex-col! ">
                            <Typography.Text className="text-orange-500!">추가 요금 설정</Typography.Text>
                            <Typography.Text className="flex items-center gap-1 text-slate-500! text-[10px]!">
                                <HelpCircle size={12} />
                                설정하지 않으면 추가 요금이 적용되지 않습니다.</Typography.Text>
                        </Space>
                        <span className="text-[10px] font-bold bg-white px-2 py-1 rounded-full border border-orange-100 shadow-sm">선택 사항</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <Form.Item name="overtime_unit_mins" className="mb-0!">
                            <InputNumber
                                suffix={<span className="text-xs font-bold text-slate-400">분당</span>}
                                placeholder="10"
                                className="w-full! h-12! rounded-xl! overflow-hidden! border-slate-100!"
                            />
                        </Form.Item>
                        <Form.Item name="overtime_unit_price" className="mb-0!">
                            <InputNumber
                                suffix={<span className="text-xs font-bold text-slate-400">원</span>}
                                placeholder="1,000"
                                className="w-full! h-12! rounded-xl! overflow-hidden! border-slate-100!"
                            />
                        </Form.Item>
                        <Form.Item
                            name="grace_period_mins"
                            label={<span className="text-[12px] font-bold text-slate-400 ml-1">유예 기간 (분)</span>}
                            className="mb-0! col-span-2"
                        >
                            <InputNumber
                                placeholder="예: 5 (5분 뒤부터 요금 발생)"
                                className="w-full! h-12! flex! items-center! rounded-xl! border-slate-100! font-bold!"
                            />
                        </Form.Item>
                    </div>
                </div>
            </section>

            <div className="flex-none flex gap-3 pt-4 pb-2">
                <Button
                    onClick={onCancel}
                    className="h-14! flex-1! rounded-3xl! border-slate-200! bg-slate-50! text-slate-500! font-bold! hover:text-slate-800! transition-all!"
                >
                    <ChevronLeft size={18} className="mr-1 inline" /> 취소
                </Button>
                <Button
                    type="primary"
                    loading={isPending}
                    htmlType="submit"
                    className="h-14! flex-1! rounded-3xl! bg-emerald-500! border-none! font-black! text-white! shadow-xl! shadow-slate-200! hover:bg-emerald-700! transition-all"
                >
                    <Save size={18} className="mr-2 inline" /> 저장하기
                </Button>
            </div>
        </Form>
    )
}