'use client'

import { Badge, Dropdown, List, Avatar, Empty, Button } from 'antd'
import { BellOutlined, CheckCircleOutlined, MessageOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import { useGetAdminInquiryNoti } from '@/entities/admin/inquiry/model/useGetAminInquiryNoti'
import { useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { InquiryNotification } from '@/entities/admin/notification/model/types'

export function AdminNotificationDropdown() {
    // TODO 다른 알림처리도 해야함
    //    TODO 클릭시 해당 페이지랑 모달 혹은 채팅방 여는 거 해야함
    const router = useRouter()
    const queryClient = useQueryClient()

    // * 1대1문의 알림
    const { data: noti = [] } = useGetAdminInquiryNoti()

    const unReadCount = useMemo(
        () => noti.filter(n => !n.is_read).length,
        [noti]
    )


    const dropdownContent = (
        <div className="w-80 bg-white rounded-xl shadow-xl border border-gray-100 flex flex-col overflow-hidden">

            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                <span className="font-semibold text-gray-800 text-sm">
                    알림 <span className="text-orange-500 font-bold ml-1">{unReadCount}</span>
                </span>
                {unReadCount > 0 && (
                    <Button
                        type="text"
                        size="small"
                        icon={<CheckCircleOutlined />}
                        className="text-xs text-gray-500 hover:text-orange-500 p-0 flex items-center"
                    >
                        모두 읽음
                    </Button>
                )}
            </div>

            <div className="max-h-80 overflow-y-auto divide-y divide-gray-50 custom-scrollbar">
                {noti.length === 0 ? (
                    <div className="py-8">
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="새로운 알림이 없습니다." />
                    </div>
                ) : (
                    <List
                        dataSource={noti}
                        renderItem={(item: InquiryNotification) => (
                            <List.Item
                                // onClick={() => handleClick(item)}
                                className={`cursor-pointer px-4! py-3! transition-colors! duration-200! hover:bg-gray-50! flex! items-start! gap-3! border-none! ${!item.is_read ? 'bg-orange-50/40 hover:bg-orange-50/80' : ''
                                    }`}
                            >
                                <div className="mt-0.5">
                                    <Avatar
                                        size={32}
                                        icon={<MessageOutlined />}
                                        className={`${!item.is_read ? 'bg-orange-500! text-white!' : 'bg-gray-100! text-gray-400!'}`}
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-0.5">
                                        <h4 className={`text-sm tracking-tight truncate ${!item.is_read ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                                            {item.title}
                                        </h4>
                                        {/* 읽지 않은 알림 점 표시 */}
                                        {!item.is_read && (
                                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full shrink-0 ml-2 mt-1.5" />
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                                        {item.message}
                                    </p>
                                    {/* <span className="text-[10px] text-gray-400 mt-1 block">5분 전</span> */} {/* 추후 시간 데이터 추가용 */}
                                </div>
                            </List.Item>
                        )}
                    />
                )}
            </div>

            <div className="border-t border-gray-50 p-2 text-center bg-gray-50/30">
                <Button type="text" size="small" block className="text-xs text-gray-500 hover:text-gray-800">
                    전체 알림 보기
                </Button>
            </div>
        </div>
    )

    return (
        <Dropdown
            trigger={['click']}
            placement="bottomRight"
            popupRender={() => dropdownContent}
        >
            <div className="flex items-center justify-center h-full cursor-pointer px-2">
                <Badge
                    count={unReadCount}
                    size="small"
                    offset={[2, 0]}
                >
                    <span className="flex items-center justify-center text-xl text-gray-600 hover:text-gray-900 transition-colors">
                        <BellOutlined />
                    </span>
                </Badge>
            </div>
        </Dropdown>
    )
}