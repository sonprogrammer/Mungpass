'use client'

import { QrModalProps } from "@/features/qr/model"
import { QrCategorySelectView, QrCodeDisplayView, QrProductSelectView, QrUnverifiedView } from "@/features/qr/ui"
import { Button, Modal, Spin } from "antd"
import { ArrowLeft } from "lucide-react"
import { memo, useMemo, useState } from "react"


function QrModalInner({ products, open, qrValue, selectedProduct, onClose, onSelectProduct, isPending, isVerified }: QrModalProps) {
    const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null)

    // * 카테고리 목록들
    const categories = useMemo(() => {
        const categoryName = products.map(p => p.product_categories?.name).filter(Boolean)
        return Array.from(new Set(categoryName)) as string[]
    }, [products])

    // * 카테고리 안 상세 상품들
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
        if (selectedProduct) {
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
                    {isVerified && (selectedCategoryName || selectedProduct) && (
                        <Button type="text" size="small" onClick={handleBack} icon={<ArrowLeft size={16} />} />
                    )}
                    <span className="font-semibold">QR 체크인 생성</span>
                </div>}
        >

            <div className="flex flex-col pt-2">
                {!isVerified ? (
                    /* //*승인되지 않은 매장 */
                    <QrUnverifiedView onClose={handleClose} />
                ) :
                isPending ? (
                    <div className="flex-1 flex items-center justify-center">
                        <Spin size="large" />
                    </div>
                ) : (
                    <>
                        {/* //*카테고리 선택 화면 */}
                        {!selectedCategoryName && !selectedProduct && (
                            <QrCategorySelectView 
                                categories={categories}
                                onSelectCategory={setSelectedCategoryName}
                            />
                        )}

                        {/* //*상품 선택 화면 */}
                        {selectedCategoryName && !selectedProduct && (
                            <QrProductSelectView 
                                selectedCategoryName={selectedCategoryName}
                                filteredProducts={filteredProducts}
                                onSelectProduct={onSelectProduct}
                            />
                        )}

                        {/* //*QR 코드 출력 화면 */}
                        {selectedCategoryName && selectedProduct && (
                            <QrCodeDisplayView qrValue={qrValue} selectedProductName={selectedProduct.name}/>
                        )}
                    </>
                )}
            </div>
        </Modal>
    )
}

export const QrModal= memo(QrModalInner)