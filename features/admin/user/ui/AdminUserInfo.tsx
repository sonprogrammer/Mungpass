'use client'

import { Profile, StoreRegistration } from "@/entities/admin/inquiry/model"
import { SUBSCRIBES_STATUS } from "@/shared/constant";
import { Avatar, Button, Divider, Tag } from "antd"
import { BadgeCheck, CalendarDays, CircleAlert, Crown, FileText, FileX, Mail, Phone, Store, User } from "lucide-react"

interface AdminUserInfoProps {
    user: Profile;
    registrations?: StoreRegistration | null
    isRejected: boolean
    isPending: boolean;
    isApproved: boolean
    isSubmitted: boolean
    goStoreInfo: () => void
}

export function AdminUserInfo({ user, registrations, isRejected, isPending, isApproved, isSubmitted, goStoreInfo }: AdminUserInfoProps) {
    const isOwner = user.role === 'owner'


    const subscribeStatus = SUBSCRIBES_STATUS[user.subscribe_status] ?? SUBSCRIBES_STATUS.NOT_STARTED

    const shop = Array.isArray(user.shop) ? user.shop[0] : user.shop
    const reg = Array.isArray(registrations) ? registrations[0] : registrations

    return (
        <>
            <div className="flex flex-col items-center py-4">
                <div className='relative'>

                    <Avatar
                        size={84}
                        src={user.avatar_url || undefined}
                        className="shadow-md"
                    >
                        {!user.avatar_url && <User size={34} />}
                    </Avatar>
                    {/* //* 유료 회원 여부 */}
                    {user.subscribe_status === 'APPROVED' && (
                        <div
                            className="absolute -top-2 right-0 rotate-40 bg-yellow-400 rounded-full p-1 shadow-md border-2 border-white"
                        >
                            <Crown
                                size={16}
                                className="text-white fill-white"
                            />
                        </div>
                    )}
                </div>

                <h2 className="mt-4 text-xl font-bold text-center">
                    {user.name}
                    {isOwner &&
                        <p className="text-slate-600 text-sm">
                            {shop && '가계명 :'}
                            {shop?.name || (isPending ? '입점 심사 중' : !isSubmitted && '입점 신청 대기중')}
                        </p>
                    }

                </h2>


                <div className="mt-2 flex flex-col items-center gap-2">
                    <div className="flex items-center gap-1">
                        <Tag color={isOwner ? 'green' : 'orange'} className="m-0 font-medium">
                            {isOwner ? '사장 회원' : '견주 회원'}
                        </Tag>
                        {isRejected && (
                            <Tag color="red" className="font-semibold rounded-full px-2.5 m-0">입점 거절</Tag>
                        )}
                        {isPending && (
                            <Tag color="gold" className="font-semibold rounded-full px-2.5 m-0">서류 심사 중</Tag>
                        )}
                    </div>

                    {isRejected && (
                        <p className="text-xs text-red-500 font-medium px-4 text-center m-0 bg-red-50/60 py-1 rounded-md border border-red-100">
                            ⚠️ 사유: {reg.rejection_reason ?? '등록된 거절 사유가 없습니다.'}
                        </p>
                    )}

                    {isOwner && isSubmitted && (
                        <Button
                            type="primary"
                            ghost
                            size="small"
                            icon={<FileText size={13} />}
                            onClick={goStoreInfo}
                            className="mt-1 flex items-center justify-center gap-1 text-xs font-semibold rounded-lg"
                        >
                            제출된 입점 서류 검토하기
                        </Button>
                    )}
                </div>
            </div>

            <Divider />

            <div className="space-y-4">

                <div className="flex items-start gap-3">
                    <Mail size={18} className="text-gray-400 mt-0.5" />

                    <div>
                        <p className="text-xs text-gray-400">이메일</p>
                        <p className="font-medium break-all">
                            {user.email || '-'}
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <Phone size={18} className="text-gray-400 mt-0.5" />

                    <div>
                        <p className="text-xs text-gray-400">전화번호</p>
                        <p className="font-medium">
                            {user.phone_number || '-'}
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <CalendarDays size={18} className="text-gray-400 mt-0.5" />

                    <div>
                        <p className="text-xs text-gray-400">가입일</p>
                        <p className="font-medium">
                            {user.join_date || '-'}
                        </p>
                    </div>
                </div>

                {isOwner && (
                    <>
                        <Divider />

                        <div className="flex items-start gap-3">
                            <Store size={18} className="text-gray-400 mt-0.5" />
                            <div>
                                <p className="text-xs text-gray-400 flex items-center gap-1.5">
                                    <span>가입 매장명</span>
                                    {!isApproved && <span className="text-[10px] text-gray-400 font-normal bg-slate-100 px-1 rounded border">임시 가입 상태</span>}
                                </p>
                                <p className={`font-semibold ${isApproved ? 'text-slate-800' : 'text-slate-500'}`}>
                                    {isApproved ? (shop?.name || '-') : (reg?.store_name || '-')}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <BadgeCheck size={18} className="text-gray-400 mt-0.5" />
                            <div>
                                <p className="text-xs text-gray-400">서비스 이용 구독 상태</p>
                                <Tag color={subscribeStatus.color} className="mt-0.5 font-medium">
                                    {subscribeStatus.text}
                                </Tag>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <CircleAlert size={18} className="text-gray-400 mt-0.5" />
                            <div>
                                <p className="text-xs text-gray-400">매장 등록 주소</p>
                                <p className={`font-medium ${isApproved ? 'text-slate-700' : 'text-slate-500'}`}>
                                    {isApproved ? (shop?.address || '-') : (reg?.address_name || '-')}
                                </p>
                            </div>
                        </div>
                    </>
                )}
                {/* //* 사장인데 입점신청 안한것 */}
                {isOwner && !isSubmitted && (
                    <div className="mt-4 p-3.5 bg-slate-50 rounded-xl border border-dashed border-slate-200 flex items-center justify-center gap-2 text-slate-500 text-xs">
                        <FileX size={15} className="text-slate-400" />
                        <span>이 사장님은 아직 가입 후 <b>입점 신청(서류 제출)을 진행하지 않은 상태</b>입니다.</span>
                    </div>
                )}
            </div>
        </>
    )
}