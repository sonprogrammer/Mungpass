'use client'

import { QrModalProps } from "@/features/qr/model/types"
import { QrCategorySelectView } from "@/features/qr/ui/QrCategorySelectView"
import { QrCodeDisplayView } from "@/features/qr/ui/QrDisplayView"
import { QrProductSelectView } from "@/features/qr/ui/QrProductSelectView"
import { QrUnverifiedView } from "@/features/qr/ui/QrUnverifiedView"
import { Button, Modal, Spin } from "antd"
import { ArrowLeft } from "lucide-react"
import { memo, useMemo, useState } from "react"


function QrModal({ products, open, qrValue, selectedProductId, onClose, onSelectProduct, isPending, isVerified }: QrModalProps) {
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
                    {isVerified && (selectedCategoryName || selectedProductId) && (
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
                        {!selectedCategoryName && !selectedProductId && (
                            <QrCategorySelectView 
                                categories={categories}
                                onSelectCategory={setSelectedCategoryName}
                            />
                        )}

                        {/* //*상품 선택 화면 */}
                        {selectedCategoryName && !selectedProductId && (
                            <QrProductSelectView 
                                selectedCategoryName={selectedCategoryName}
                                filteredProducts={filteredProducts}
                                onSelectProduct={onSelectProduct}
                            />
                        )}

                        {/* //*QR 코드 출력 화면 */}
                        {selectedProductId && (
                            <QrCodeDisplayView qrValue={qrValue} />
                        )}
                    </>
                )}
            </div>
        </Modal>
    )
}

export default memo(QrModal)