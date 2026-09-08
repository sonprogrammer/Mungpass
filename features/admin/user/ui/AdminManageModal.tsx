'use client'

import { Modal, Input, Button } from 'antd'
import { useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { useGetUserInfo, useUpdateToAdmin } from '@/features/admin/user/model'
import { useDebounce } from '@/shared/model/useDebounce'


interface AdminManageModalProps {
    open: boolean
    onClose: () => void
}

type UserRole = 'user' | 'owner' | 'admin'

interface User {
    id: string
    name: string
    email: string
    role: UserRole
}

const userRole = {
    user: '일반 유저',
    owner: '사장',
    admin: '관리자'
} as const

export function AdminManageModal({ open, onClose }: AdminManageModalProps) {
    const [keyword, setKeyword] = useState('')
    const [selectedUser, setSelectedUser] = useState<User | null>(null)

    const debounceKeyword = useDebounce(keyword, 500)

    //*유저 검색
    const { data: users = [], isPending: isSearching } = useGetUserInfo({ keyword: debounceKeyword, enabled: debounceKeyword.trim().length >= 2 })
    
    //* 관리자임명
    const { mutate: appointAdmin, isPending } = useUpdateToAdmin()

    const handleAppointAdmin = () => {
        if (!selectedUser) return

        appointAdmin(selectedUser.id, {
            onSuccess: (response) => {
                if (response.success) {
                    setKeyword('')
                    setSelectedUser(null)
                    onClose()
                }
            },
        })
    }

    const handleClose = () => {
        setKeyword('')
        setSelectedUser(null)
        onClose()
    }

    return (
        <Modal
            title="관리자 관리"
            open={open}
            onCancel={handleClose}
            footer={null}
            centered
        >
            <div className="flex flex-col gap-4 pt-3">


                <p className="mb-2 text-sm font-medium">
                    관리자 임명
                </p>

                <p className="mb-4 text-sm text-gray-500">
                    관리자로 임명할 사용자를 선택해주세요.
                </p>

                <Input
                    value={keyword}
                    onChange={(e) => {
                        setKeyword(e.target.value)
                        setSelectedUser(null)
                    }}
                    placeholder="이메일 또는 이름으로 검색"
                    prefix={<SearchOutlined />}
                    size="large"
                />

                {keyword && (
                    <div className="max-h-60 overflow-y-auto rounded-lg border">
                        {isSearching && (
                            <p className="p-4 text-sm text-gray-500">
                                검색 중...
                            </p>
                        )}

                        {!isSearching && users.length === 0 && (
                            <p className="p-4 text-sm text-gray-500">
                                검색 결과가 없습니다.
                            </p>
                        )}

                        {users.map((user: User) => (
                            <button
                                key={user.id}
                                type="button"
                                onClick={() => setSelectedUser(user)}
                                className="w-full border-b p-3 text-left last:border-b-0 hover:bg-gray-50"
                            >
                                <div className="font-medium">
                                    {user.name}
                                </div>

                                <div className="text-sm text-gray-500">
                                    {user.email}
                                </div>

                                <div className="mt-1 text-xs text-gray-400">
                                    현재 역할: {userRole[user.role]}
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {selectedUser && (
                    <div className="rounded-lg bg-gray-50 p-4">
                        <p className="text-sm text-gray-500">
                            선택된 사용자
                        </p>

                        <p className="mt-1 font-semibold">
                            {selectedUser.name}
                        </p>

                        <p className="text-sm text-gray-500">
                            {selectedUser.email}
                        </p>
                    </div>
                )}

                <Button
                    type="primary"
                    size="large"
                    loading={isPending}
                    disabled={!keyword.trim()}
                    onClick={handleAppointAdmin}
                    block
                >
                    관리자로 임명
                </Button>
            </div>
        </Modal>
    )
}