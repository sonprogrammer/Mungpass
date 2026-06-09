'use client'

import { Tabs } from "antd"



interface SelectTabForSearchUserProps {
    items: { key: string; label: string }[]
    activeTab: string;
    onChange: (key: string) => void
}

export function SelectTabForSeachUser({ activeTab, onChange, items }: SelectTabForSearchUserProps) {
    const selection = items.map((item) => ({
        key: item.key,
        label: (
            <span>
                {item.label}
            </span>
        )
    }))

    return (
        <div>
            <Tabs activeKey={activeTab} onChange={onChange} items={selection} />
        </div>
    )
}