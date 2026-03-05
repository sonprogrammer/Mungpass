'use client'

import { StoreSearchWidgetProps } from "@/features/auth/model/types"
import { Search, X } from "lucide-react"


export function StoreSearchWidget({ setKeyword, searchValue, setSearchValue }: StoreSearchWidgetProps) {

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const trimmed = searchValue.trim()
            if (trimmed) {
                setKeyword(trimmed)
            }
        }
    }

    return (
        <div className="flex shadow-md rounded-2xl mx-6">
            <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-500" />
                <input
                    type="text"
                    value={searchValue ?? ''}
                    placeholder="동네 이름이나 시설명을 검색해보세요"
                    className="w-full pl-12 pr-4 py-4 bg-white border-2 border-orange-100 rounded-2xl outline-none focus:border-orange-500 transition-all text-sm font-bold"
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                {searchValue && (
                    <button onClick={() => {
                        setSearchValue('')
                        setKeyword('')
                    }}>
                        <X className="absolute right-3 top-1/2 -translate-y-1/2" />
                    </button>
                )}
            </div>
        </div>
    )
}