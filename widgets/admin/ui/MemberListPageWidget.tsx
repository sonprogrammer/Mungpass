'use client'

import { Profile } from "@/entities/admin/inquiry/model"
import { OWNER_STATUS_TABS, USER_ROLE_TABS } from "@/features/admin/user/config"
import { useGetUserInfo } from "@/features/admin/user/model"
import { AdminUserDetailModal, DisplayUserByFilter, SelectTabForSeachUser, UserSearchInput } from "@/features/admin/user/ui"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

export function MemberListPageWidget() {
    // * 회운유형별, 사장선택시 사장 입정 상태별
    const [filters, setFilters] = useState({ keyword: '', role: 'all', ownerStatus: 'all' })
    const [selectedUser, setSelectedUser] = useState<Profile | null>(null)

    const queryClient = useQueryClient()

    const { isFetching } = useGetUserInfo(filters)

    const handleRoleChange = (role: string) => {
        setFilters(prev => ({ ...prev, role, ownerStatus: 'all' }))
    }

    const handleOwnerStatusChange = (status: string) => {
        setFilters(prev => ({ ...prev, ownerStatus: status }))
    }

    const handleSuccess = () => {
        queryClient.invalidateQueries({ queryKey: ['userInfo', filters.keyword] })
        setSelectedUser(null)
    }

    return (
        <div>
            <h1>회원관리</h1>
            <UserSearchInput onSearch={(k) => setFilters(prev => ({ ...prev, keyword: k }))} isFetching={isFetching} />
            <SelectTabForSeachUser
                items={USER_ROLE_TABS}
                activeTab={filters.role}
                onChange={handleRoleChange}
            />

            {/* //*사장님탭일 시 */}
            {filters.role === 'owner' && (
                <SelectTabForSeachUser
                    items={OWNER_STATUS_TABS}
                    activeTab={filters.ownerStatus}
                    onChange={handleOwnerStatusChange}
                />
            )}

            <DisplayUserByFilter filters={filters} onSelectUser={setSelectedUser} />

            {selectedUser && (
                <AdminUserDetailModal
                    open={Boolean(selectedUser)}
                    onClose={() => setSelectedUser(null)}
                    user={selectedUser}
                    onSuccess={handleSuccess}
                />
            )}

        </div>
    )
}