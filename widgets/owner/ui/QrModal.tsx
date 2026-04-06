'use client'

import { QrModalProps } from "@/features/qr/model/types"
import { Button, Empty, Modal, Spin, Typography } from "antd"
import { ArrowLeft, ChevronRight } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import { useMemo, useState } from "react"


export function QrModal({ products, open, qrValue, selectedProductId, onClose, onSelectProduct, isPending }: QrModalProps) {
    const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null)


    // * 카테고리 목록들
    const categories = useMemo(() => {
        const categoryName = products.map(p => p.product_categories?.name).filter(Boolean)
        return Array.from(new Set(categoryName)) as string[]
    }, [products])


    // * 카테고리 내용들
    const filteredProducts = useMemo(() => {
        if (!selectedCategoryName) return []
        return products.filter(p => p.product_categories?.name === selectedCategoryName)
    }, [products, selectedCategoryName])


    const handleClose = () => {
        setSelectedCategoryName(null)
        onSelectProduct(null)
        onClose()
    }

    const handleBack = () => {
        if (selectedProductId) {
            onSelectProduct(null)
        } else if (selectedCategoryName) {
            setSelectedCategoryName(null)
        }
    }

    return (
        <Modal
            open={open}
            onCancel={handleClose}
            footer={null}
            centered
            width={360}
            title={<div className="flex items-center gap-2">
                {(selectedCategoryName || selectedProductId) && (
                    <Button type="text" size="small" onClick={handleBack} icon={<ArrowLeft size={16} />} />
                )}
                <span className="font-semibold">QR 체크인 생성</span>
            </div>}
        >

            <div className="flex flex-col pt-2">
                {isPending ? (
                    <div className="flex-1 flex items-center justify-center">
                        <Spin size="large" />
                    </div>
                ) : (
                    <>
                        {/* //*카테고리 선택 화면 */}
                        {!selectedCategoryName && !selectedProductId && (
                            <div className="flex flex-col gap-3">
                                <Typography.Text className="text-slate-500 text-sm">이용 유형을 선택하세요.</Typography.Text>
                                {categories.map(cat => (
                                    <Button
                                        key={cat}
                                        block
                                        size="large"
                                        className="h-14 flex justify-between items-center text-left"
                                        onClick={() => setSelectedCategoryName(cat)}
                                    >
                                        <span className="font-medium">{cat}</span>
                                        <ChevronRight size={16} className="text-slate-300" />
                                    </Button>
                                ))}
                                {categories.length === 0 && <Empty description="등록된 카테고리가 없습니다." />}
                            </div>
                        )}

                        {/* //*상품 선택 화면 */}
                        {selectedCategoryName && !selectedProductId && (
                            <div className="flex flex-col gap-3">
                                <div className="bg-slate-50 p-3 rounded-xl mb-1 flex justify-between">
                                    <Typography.Text className="text-[11px]  block!">선택된 유형</Typography.Text>
                                    <Typography.Text className="font-bold text-orange-500!">{selectedCategoryName}</Typography.Text>
                                </div>
                                <Typography.Text className="text-slate-500 text-sm">상세 상품을 선택하세요.</Typography.Text>


                                {filteredProducts.map(prod => (
                                    <Button
                                        key={prod.id}
                                        block
                                        size="large"
                                        className="h-14 text-left justify-start font-medium"
                                        onClick={() => onSelectProduct(prod.id)}
                                    >
                                        {prod.name}
                                    </Button>
                                ))}
                                {(filteredProducts.length === 0) && (
                                    <Empty description="이 카테고리에 등록된 상품이 없습니다." />
                                )}
                            </div>
                        )}

                        {/* //*QR 코드 출력 화면 */}
                        {selectedProductId && (
                            <div className="flex flex-col items-center gap-6 py-4 animate-in fade-in zoom-in duration-300">
                                <div className="text-center">
                                    <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[11px] font-bold mb-2 uppercase">
                                        check-in
                                    </div>
                                    <Typography.Title level={4} className="m-0">
                                        체크인 QR 코드
                                    </Typography.Title>
                                </div>

                                <div className="p-4 bg-white rounded-2xl shadow-lg border border-slate-100">
                                    <QRCodeSVG
                                        value={qrValue}
                                        size={200}
                                        level="H"
                                        marginSize={2}
                                    />
                                </div>

                                <div className="text-center bg-slate-50 p-4 rounded-2xl w-full">
                                    <p>보호자가 스캔 후</p>
                                    <p>
                                        <span className="font-bold text-slate-800">실시간 이용시간</span>을 확인할 수 있습니다.
                                    </p>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </Modal>
    )
}