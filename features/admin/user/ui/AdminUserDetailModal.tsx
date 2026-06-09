'use client'

import { Profile } from '@/entities/admin/inquiry/model'
import { AdminStoreRegiInfo } from '@/features/admin/user/ui/AdminStoreRegiInfo'
import { AdminUserInfo } from '@/features/admin/user/ui/AdminUserInfo'
import { Modal} from 'antd'
import {User} from 'lucide-react'
import { useState } from 'react'




interface UserInfoModalProps {
    open: boolean
    onClose: () => void
    user: Profile | null
    onSuccess?: () =>void
}


export function AdminUserDetailModal({
    open,
    onClose,
    user,
    onSuccess
}: UserInfoModalProps) {
    const [mode, setMode] = useState<'main' | 'store'>('main')

    if (!user) return null
    

    //* 사장 유저시 매장 입점신청했는지 보기 위한것
    const registrations = user.store_registrations

     const reg = Array.isArray(registrations) ? registrations[0] : registrations
    

    // * 입점 신청을 했는지 여부
    const isSubmitted = Boolean(registrations)

    const isPending = isSubmitted && reg.status === 'PENDING'
    const isApproved = Boolean(user.shop)
    const isRejected = isSubmitted && reg.status === 'REJECTED'

    
    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            centered
            width={'60%'}
            title={
                <div className="flex items-center gap-2">
                    <User size={18} />
                    <span className="font-bold">회원 정보</span>
                </div>
            }
        >
            {mode === 'main' ? (

                <AdminUserInfo
                    isPending={isPending}
                    isRejected={isRejected}
                    isSubmitted={isSubmitted}
                    isApproved={isApproved}
                    registrations={registrations}
                    goStoreInfo={() => setMode('store')}
                    user={user}
                />
            )
                : registrations && (
                    <AdminStoreRegiInfo
                        goBack={() => setMode('main')}
                        registrations={registrations}
                        isPending={isPending}
                        isApproved={isApproved}
                        isRejected={isRejected}
                        onSuccess={onSuccess}
                    />
                )
            }
        </Modal>
    )
}