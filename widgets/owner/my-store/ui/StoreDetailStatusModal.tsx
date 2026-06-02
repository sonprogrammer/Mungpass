'use client'

import { RegistrationDoc } from "@/features/owner/my-store/ui/RegistrationDoc"
import { StoreDetailStatusModalProps } from "@/widgets/owner/my-store/model/types"
import { StoreApprovalTimeline } from "@/widgets/owner/my-store/ui/StoreApprovalTimeline"
import { Button, Divider, Modal } from "antd"
import { AlertCircle, FileCheck, Store } from "lucide-react"



export function StoreDetailStatusModal({ isOpen, onClose, storeName, currentStatus, regisData, handleReSubmit, handleOpenDocs }: StoreDetailStatusModalProps) {
    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            width={500}
            centered
            className="rounded-3xl"
            footer={[
                currentStatus === 'REJECTED' && (
                    <Button
                        key='submit'
                        type='primary'
                        onClick={handleReSubmit}
                        className='h-11! px-5! rounded-xl! bg-red-400! hover:bg-red-600! font-bold!'
                    >
                        재 제출
                    </Button>
                ),
                <Button
                    key="close"
                    type="primary"
                    onClick={onClose}
                    className="h-11! px-5! rounded-xl! bg-emerald-500! hover:bg-emerald-700! font-bold!"
                >
                    확인
                </Button>
            ]}
        >
            <div className="relative mb-6 pt-2">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-emerald-100 rounded-xl text-emerald-500">
                        <Store size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Store Approval</p>
                        <h2 className="text-lg font-bold text-gray-900">{storeName}</h2>
                    </div>
                </div>
                <div className="h-px w-full bg-gray-100" />
            </div>

            <div className="overflow-y-auto py-1 space-y-8 scrollbar-none" style={{ maxHeight: 'calc(100vh - 300px)' }}>
                <StoreApprovalTimeline regisData={regisData} currentStatus={currentStatus} />
                <Divider />

                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                            <FileCheck size={16} className="text-emerald-500" />
                            제출한 서류 목록
                        </h3>
                    </div>
                    <RegistrationDoc regisData={regisData} currentStatus={currentStatus} handleOpenDocs={handleOpenDocs} />
                </section>

                <div className="space-y-4 pt-4">
                    <div className="flex items-start gap-2 rounded-2xl bg-blue-50/50 p-4 border border-blue-100/30">
                        <AlertCircle size={14} className="mt-0.5 text-blue-500 shrink-0" />
                        <p className="text-[11px] leading-5 text-blue-700 font-medium">
                            승인 절차에 대해 궁금한 점이 있으신가요? <br />
                            {/* //TODO 관리자 문의하기하면 현재 모달 닫아지고 관리자 문의 하기 모달 띄우기 */}
                            <span className="underline cursor-pointer font-bold">관리자 문의하기</span>를 통해 빠르게 도움을 받으실 수 있습니다.
                        </p>
                    </div>

                </div>
            </div>
        </Modal>
    )
}