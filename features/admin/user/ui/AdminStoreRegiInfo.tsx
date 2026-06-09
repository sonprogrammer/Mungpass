'use client'
import { useState } from 'react'
import { Modal, Tag, Button, message, Badge } from 'antd'
import { format } from 'date-fns'
import {
    ClipboardList,
    FileImage,
    AlertTriangle,
    ChevronLeft,
    ChevronUp,
    ChevronDown
} from 'lucide-react'
import { StoreRegistration } from '@/entities/admin/inquiry/model'
import { ApproveStoreBtn } from '@/features/admin/store/ui'
import { getAdminUrl } from '@/features/admin/store/api'
import { AnimatePresence, motion } from 'framer-motion'

interface AdminStoreRegiInfoProps {
    registrations: StoreRegistration;
    isPending: boolean
    isApproved: boolean
    isRejected: boolean
    goBack: () => void
    onSuccess?: () => void
}

export function AdminStoreRegiInfo({ registrations, isPending, isApproved, isRejected, goBack, onSuccess }: AdminStoreRegiInfoProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [showReason, setShowReason] = useState(false)

    const reg = Array.isArray(registrations) ? registrations[0] : registrations


    const handleOpenDocs = async (path: string | null) => {

        if (!path) {
            message.warning('등록된 첨부 서류 파일 경로가 없습니다.')
            return
        }

        const url = await getAdminUrl(path)

        if (!url) {
            message.error('서류 주소를가져오지 못했습니다')
            return
        }

        if (!path.toLowerCase().includes('.pdf')) {
            const img = new Image()
            img.src = url
        }
        setPreviewUrl(url)
    }

    const hasHistoryContext = Boolean(reg.rejection_reason || reg.rejected_at)

    return (
        <>

            <div className="border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6 space-y-4 flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <Button
                        type="text"
                        icon={<ChevronLeft size={16} />}
                        onClick={goBack}
                        className="text-gray-500 hover:text-slate-800 flex items-center -ml-2 text-xs"
                    >
                        기본 정보로 돌아가기
                    </Button>
                    <Tag color={isApproved ? 'blue' : isRejected ? 'red' : 'orange'} className="font-semibold m-0">
                        {isApproved ? '승인 완료' : isRejected ? '반려됨' : '심사 대기중'}
                    </Tag>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-1.5 text-slate-800 font-bold text-sm mb-1">
                        <ClipboardList size={16} className="text-orange-500" />
                        <span>제출된 입점 서류 상세 정보</span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-8">
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <span className="text-gray-400 block mb-1">신청 매장명</span>
                                <span className="font-bold text-slate-800 text-sm">{reg.store_name}</span>
                            </div>
                            <div>
                                <span className="text-gray-400 block mb-1">연락처</span>
                                <span className="font-medium text-slate-700">{reg.phone || '-'}</span>
                            </div>
                            <div>
                                <span className="text-gray-400 block mb-1">사업자 등록번호</span>
                                <span className="font-mono font-semibold text-slate-700 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                                    {reg.business_number}
                                </span>
                            </div>

                            <div>
                                <span className="text-gray-400 block mb-0.5">신청 지번 주소</span>
                                <span className="text-slate-700 font-medium">{reg.address_name}</span>
                            </div>
                        </div>



                        <div className="text-[11px] text-gray-400 flex flex-col gap-1">
                            <div className="flex justify-between">
                                <span>최초 서류 제출일</span>
                                <span className="font-medium text-slate-600">
                                    {reg.submitted_at ? format(new Date(reg.submitted_at), 'yyyy-MM-dd HH:mm') : '-'}
                                </span>
                            </div>
                            {reg.re_submit_at && (
                                <div className="flex justify-between text-amber-600 bg-amber-50/50 px-1.5 py-0.5 rounded">
                                    <span>🔄 서류 재제출 일시</span>
                                    <span className="font-semibold">
                                        {format(new Date(reg.re_submit_at), 'yyyy-MM-dd HH:mm')}
                                    </span>
                                </div>
                            )}
                        </div>

                        {hasHistoryContext && (
                            <div className="border-t border-slate-200/60 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowReason(!showReason)}
                                    className="w-full flex items-center justify-between text-[11px] font-bold text-slate-600 hover:text-slate-900 transition-colors py-1 cursor-pointer"
                                >
                                    <div className="flex items-center gap-1">
                                        <AlertTriangle size={13} className="text-red-400" />
                                        <span>이전 심사 이력 및 사유 보기</span>
                                    </div>
                                    {showReason ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                                </button>

                                <AnimatePresence>
                                    {showReason && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden" 
                                        >
                                            <div className="mt-2 p-2.5 bg-red-50/40 rounded-lg border border-red-100/60 text-[11px] space-y-2">
                                                {reg.rejected_at && (
                                                    <div className="flex justify-between text-red-700/80 border-b border-red-100 pb-1 font-medium">
                                                        <span>❌ 최종 반려 처리일</span>
                                                        <span>{format(new Date(reg.rejected_at), 'yyyy-MM-dd HH:mm')}</span>
                                                    </div>
                                                )}
                                                {reg.rejection_reason && (
                                                    <div>
                                                        <span className="font-bold text-red-600 block mb-0.5">⚠️ 반려 및 거절 사유</span>
                                                        <p className="text-slate-600 m-0 leading-relaxed bg-white p-1.5 rounded border border-slate-100 whitespace-pre-wrap">
                                                            {reg.rejection_reason}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>

                    <div className="space-y-1.5">
                        <span className="text-xs text-gray-400 font-medium block">증빙 서류 확인</span>
                        <div
                            onClick={() => handleOpenDocs(reg.biz_reg_image_url)}
                            className="flex items-center justify-between p-3 bg-emerald-50/60 hover:bg-emerald-50 rounded-xl border border-emerald-100/70 cursor-pointer transition-all active:scale-[0.99] group"
                        >
                            <div className="flex items-center gap-2.5">
                                <div className="p-1.5 bg-emerald-500 rounded-lg text-white">
                                    <FileImage size={16} />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-bold text-slate-700 m-0">사업자등록증 원본 서류</p>
                                    <p className="text-[11px] text-emerald-600 m-0">클릭하여 안전한 보안 뷰어로 열기</p>
                                </div>
                            </div>
                            <Badge status="processing" text={<span className="text-xs font-medium text-emerald-700">확인 가능</span>} />
                        </div>
                    </div>
                </div>


                {isPending && (
                    <div className="pt-3 border-t border-slate-100 flex flex-col items-end gap-1.5">
                        <p className="text-xs font-bold text-slate-800">⚡ 서류 즉시 심사 관리</p>
                        <div className="w-full flex justify-end">
                            <ApproveStoreBtn
                                registrationID={reg.id}
                                registrationStoreName={reg.store_name}
                                onSuccess={onSuccess}
                            />
                        </div>
                    </div>
                )}
            </div>

            <Modal
                open={!!previewUrl}
                footer={null}
                width={800}
                onCancel={() => setPreviewUrl(null)}
                centered={true}
            >

                {previewUrl && (
                    previewUrl.toLowerCase().includes(".pdf") ? (
                        <iframe
                            src={previewUrl}
                            width="100%"
                            height="600px"
                            style={{ border: "none" }}
                        />
                    ) : (
                        <img
                            src={previewUrl}
                            style={{ width: "100%" }}
                            onContextMenu={(e) => e.preventDefault()}
                            draggable={false}
                            alt='서류 이미지 '
                        />
                    )
                )}

            </Modal>
        </>
    )
}