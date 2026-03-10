'use client'

import { ShopOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Card, Divider, Typography } from "antd"

export function QuickActions() {
    return(
        <Card title={<Typography.Text strong>빠른 작업</Typography.Text>}
            variant="outlined" className='shadow-sm h-full'
        >
            <div className="flex flex-col gap-3">
                <Button block size="large" icon={<ShopOutlined />}>신규 지점 등록</Button>
                <Button block size="large" icon={<UserOutlined />}>회원 정보 조회</Button>
                <Divider style={{margin: '12px 0'}}/>
            </div>

            {/* //TODO 공지 사항이나 그런거 추가 */}
        </Card>
    )
}