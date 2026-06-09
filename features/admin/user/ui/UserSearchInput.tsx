'use client'

import { Input } from "antd"

interface UserSearchInputProps{
    onSearch: (k: string) => void
    isFetching: boolean
}

export function UserSearchInput({onSearch, isFetching}: UserSearchInputProps) {
    return (
        <div>
            <div className="mt-5 mb-6">
                <Input.Search
                    placeholder="회원의 이름 혹은 가게명을 입력하세요"
                    enterButton={<span className="px-2">조회</span>}
                    size="large"
                    loading={isFetching}
                    onSearch={onSearch}
                    allowClear
                    className="hover:border-orange-500 focus:border-orange-500"
                />
            </div>
        </div>
    )
}