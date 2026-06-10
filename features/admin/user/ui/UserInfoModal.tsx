'use client'
import { Profile } from "@/entities/admin/inquiry/model";
import { useGetUserInfo } from "@/features/admin/user/model";
import { UserTable } from "@/features/admin/user/ui";
import { AdminUserDetailModal } from "@/features/admin/user/ui/AdminUserDetailModal";
import { useQueryClient } from "@tanstack/react-query";
import { Input, Modal } from "antd";
import { useState } from "react";

interface UserInfoModalProps {
    open: boolean;
    onClose: () => void
}

export function UserInfoModal({ open, onClose }: UserInfoModalProps) {
    const [keyword, setKeyword] = useState('')
    const [selectedUser, setSelectedUser] = useState<Profile | null>(null)

    const queryClient = useQueryClient()


    const { data: userList = [], isPending, fetchStatus } = useGetUserInfo({ keyword, enabled: keyword.trim() !== '' })

    const isFetching = isPending && fetchStatus !== 'idle'

    const handleSuccess = () => {
        queryClient.invalidateQueries({ queryKey: ['userInfo', keyword] })
        setSelectedUser(null)
    }



    return (
        <>
            <Modal
                title='회원 정보 조회'
                open={open}
                destroyOnHidden={true}
                onCancel={() => {
                    onClose()
                    setKeyword('')
                }}
                footer={null}
                width={'70%'}
            >

                <div className="mt-5 mb-6">
                    <Input.Search
                        placeholder="회원의 이름을 입력 후 엔터 또는 조회 버튼을 눌러주세요."
                        enterButton={<span className="px-2">조회</span>}
                        size="large"
                        loading={isFetching}
                        onSearch={(value) => setKeyword(value)}
                        allowClear
                        className="hover:border-orange-500 focus:border-orange-500"
                    />
                </div>


                {keyword ? (
                    <div className="border border-slate-100 rounded-xl overflow-hidden shadow-sm">
                        <UserTable
                            userList={userList}
                            loading={isFetching}
                            onRowClick={(record) => setSelectedUser(record)}
                        />

                    </div>
                ) : (
                    <div className="py-10 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 transition-all my-4">
                        <div className="text-3xl mb-3">🔍</div>
                        <h3 className="text-slate-700 font-semibold text-base mb-1">회원 조회를 시작합니다</h3>
                        <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                            상단 검색창에 회원명을 입력하시면 <br />
                            역할 권한 및 가입 정보를 실시간으로 확인할 수 있습니다.
                        </p>
                    </div>
                )
                }

            </Modal>

            {selectedUser && (
                <AdminUserDetailModal
                    open={Boolean(selectedUser)}
                    onClose={() => setSelectedUser(null)}
                    user={selectedUser}
                    onSuccess={handleSuccess}
                />
            )}

        </>
    )
}