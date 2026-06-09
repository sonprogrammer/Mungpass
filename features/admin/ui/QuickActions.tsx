'use client'

import { RegisterStoreModal } from "@/features/admin/store/ui"
import { UserInfoModal } from "@/features/admin/user/ui"
import { KakaoScriptProvider } from "@/shared/ui/map"
import { ShopOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Card, Divider, Typography } from "antd"
import { useState } from "react"

export function QuickActions() {
    const [storeOpenModal, setStoreOpenModal] = useState(false)
    const [userOpenModal, setUserOpenModal] = useState(false)


    return (
        <>
            <Card title={<Typography.Text strong>빠른 작업</Typography.Text>}
                variant="outlined" className='shadow-sm h-full'
            >
                <div className="flex flex-col gap-3">
                    <Button
                        block
                        size="large"
                        icon={<ShopOutlined />}
                        onClick={() => setStoreOpenModal(true)}
                    >
                        신규 지점 등록
                    </Button>
                    <Button
                        block
                        size="large"
                        icon={<UserOutlined />}
                        onClick={() => setUserOpenModal(true)}
                    >
                        회원 정보 조회
                    </Button>
                    <Divider style={{ margin: '12px 0' }} />
                </div>

                {/* //TODO 공지 사항이나 그런거 추가 -> 일반 유저, 사장도 볼 수 있게 */}
            </Card>

            {storeOpenModal && (
                <KakaoScriptProvider fallback={<>map loaidng</>}>

                    <RegisterStoreModal open={storeOpenModal} onClose={() => setStoreOpenModal(false)} />
                </KakaoScriptProvider>

            )}
            {userOpenModal && (
                <UserInfoModal open={userOpenModal} onClose={() => setUserOpenModal(false)} />
            )}

        </>
    )
}