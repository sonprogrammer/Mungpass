'use client'

import { CurrentLogItem } from "@/entities/owner/ui/CurrentLogItem"
import { Empty, Typography } from "antd"
import { CurrentLogListProps } from "@/widgets/owner/model/type"

export function CurrentLogList({data, onCheckout} : CurrentLogListProps) {
    if(data.length === 0){
        return(
            <div> 
                <Empty 
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                        <Typography.Text type="secondary">
                            현재 이용 중인 반려견이 없습니다.
                        </Typography.Text>
                    }
                />
            </div>
        )
    }
    return(
        <div className="flex flex-col gap-2 h-full overflow-y-auto">
            {data.map(item => (
                <CurrentLogItem 
                    key={item.id}
                    item={item}
                    onCheckout={onCheckout}
                />
            ))}
        </div>
    )
}