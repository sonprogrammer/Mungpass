'use client'
import { useMemo } from 'react';
import { format } from 'date-fns';
import { FileText } from "lucide-react";
import { Button, Tag, Tooltip } from "antd";
import { RegistrationDocProps } from '@/entities/owner/my-shop/model/types';


export function RegistrationDoc({ regisData, currentStatus, handleOpenDocs }: RegistrationDocProps) {

    const documents = useMemo(() => {
        if (!regisData.biz_reg_image_url && !regisData.discarded_at) return []

        const isDiscarded = !!regisData.discarded_at
        const fileName = regisData.biz_reg_image_url?.split('/').pop() || 'licence-image.jpg'

        return [{
            name: fileName,
            date: format(new Date(regisData.submitted_at), 'yyyy.MM.dd'),
            status: currentStatus === 'APPROVED' ? 'APPROVED' : 'PENDING',
            label: '사업자 등록증',
            url: regisData.biz_reg_image_url,
            isDiscarded,
            discardedDate: regisData.discarded_at ? format(new Date(regisData.discarded_at), 'yyyy.MM.dd') : null,
            expiresDate: regisData.expires_at ? format(new Date(regisData.expires_at), 'yyyy.MM.dd') : null,
        }];
    }, [regisData, currentStatus])



    return (
        <div className="space-y-3">
            {documents.length > 0 ? (
                documents.map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded-2xl border border-gray-50 bg-gray-50/50 p-4 transition-all hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                                <FileText size={20} className={doc.isDiscarded ? "text-gray-200" : "text-gray-400"} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className={`text-sm font-bold ${doc.isDiscarded ? 'text-gray-400' : 'text-gray-800'}`}>
                                        {doc.label}
                                    </p>
                                    <Tag color={doc.isDiscarded ? 'default' : (doc.status === 'APPROVED' ? 'success' : 'warning')}
                                        className="m-0 text-[10px] py-0 px-1.5 border-none font-bold">
                                        {doc.isDiscarded ? '파기 완료' : (doc.status === 'APPROVED' ? '승인' : '검토 중')}
                                    </Tag>
                                </div>
                                <p className="text-[11px] text-gray-400 mt-0.5 font-medium">
                                    {doc.isDiscarded
                                        ? `${doc.discardedDate} 정보 보호를 위해 파기됨`
                                        : `${doc.expiresDate} 자동 파기 예정`}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-1">
                            {doc.isDiscarded ? (
                                <Tooltip title="개인정보 보호 정책에 따라 폐기된 서류입니다.">
                                    <span className="text-[10px] text-gray-300 font-bold px-2">조회 불가</span>
                                </Tooltip>
                            ) : (
                                <>
                                    <Button
                                        type="text"
                                        size="small"
                                        className="font-bold! hover:bg-orange-50! text-orange-500!"
                                        onClick={() => handleOpenDocs(doc.url!)}
                                    >
                                        보기
                                    </Button>
                                    
                                </>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-8 border-2 border-dashed border-gray-100 rounded-2xl text-gray-400 text-[11px] font-medium">
                    제출된 서류가 없습니다.
                </div>
            )}
        </div>
    );
}