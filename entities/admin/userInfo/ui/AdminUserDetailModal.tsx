'use client'

import { Modal, Avatar, Tag, Divider } from 'antd'
import {
    User,
    Mail,
    Phone,
    Store,
    CalendarDays,
    BadgeCheck,
    CircleAlert,
    Crown,
} from 'lucide-react'
import { Profile } from '@/entities/admin/inquiry/model/types'
import { SUBSCRIBES_STATUS } from '@/shared/constant/usersubscribeStatus'


interface UserInfoModalProps {
    open: boolean
    onClose: () => void
    user: Profile | null
}


export function AdminUserDetailModal({
    open,
    onClose,
    user
}: UserInfoModalProps) {

    if (!user) return null

    const isOwner = user.role === 'owner'

    const subscribeStatus = SUBSCRIBES_STATUS[user.subscribe_status] ?? SUBSCRIBES_STATUS.NOT_STARTED

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            centered
            width={460}
            title={
                <div className="flex items-center gap-2">
                    <User size={18} />
                    <span className="font-bold">회원 정보</span>
                </div>
            }
        >
            <div className="flex flex-col items-center py-4">
                <div className='relative'>

                    <Avatar
                        size={84}
                        src={user.avatar_url || undefined}
                        className="shadow-md"
                    >
                        {!user.avatar_url && <User size={34} />}
                    </Avatar>

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

                <h2 className="mt-4 text-xl font-bold">
                    {isOwner
                        ? user.shop?.[0]?.name || '매장명 없음'
                        : user.name}
                </h2>

                <div className="mt-2">
                    <Tag color={isOwner ? 'orange' : 'blue'}>
                        {isOwner ? '사장 회원' : '일반 회원'}
                    </Tag>
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
                                <p className="text-xs text-gray-400">매장명</p>
                                <p className="font-medium">
                                    {user.shop?.[0]?.name || '-'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <BadgeCheck size={18} className="text-gray-400 mt-0.5" />

                            <div>
                                <p className="text-xs text-gray-400">회원 상태</p>

                                <Tag color={subscribeStatus.color}>
                                    {subscribeStatus.text}
                                </Tag>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <CircleAlert size={18} className="text-gray-400 mt-0.5" />

                            <div>
                                <p className="text-xs text-gray-400">매장 주소</p>
                                <p className="font-medium">
                                    {user.shop?.[0]?.address || '-'}
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    )
}