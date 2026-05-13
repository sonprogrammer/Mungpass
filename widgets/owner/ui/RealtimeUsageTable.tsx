'use client'

import Link from 'next/link';
import {
  Card,
  Button,
  Space,
  Typography,
  Empty,
  Badge,
  List,
  Spin,
} from 'antd';
import {
  ThunderboltOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { CurrentLogItem } from '@/entities/owner/ui/CurrentLogItem';
import { useState } from 'react';
import { CurrentLogDetailModal } from '@/entities/owner/ui/CurrentLogDetailModal';
import { ConfirmModal } from '@/shared/ui/ConfirmModal';
import { CurrentUsageLog } from '@/entities/check-in/model/types';
import { usePostCheckout } from '@/features/qr/owner/model/usePostCheckout';


dayjs.extend(customParseFormat)

export function RealtimeUsageTable({ items, loading, isVerified }: { items: CurrentUsageLog[], loading: boolean, isVerified: boolean }) {
  const [detailItem, setDetailItem] = useState<CurrentUsageLog | null>(null)
  const [checkoutItem, setCheckoutItem] = useState<CurrentUsageLog | null>(null)

  const { mutate: checkoutMutate} = usePostCheckout()

  const displayLists = isVerified ? items : []
  const showViewAll = items.length >= 4

  const sortedData = [...items].sort((a, b) => {
    const timeA = dayjs(a.started_at, 'HH:mm')
    const timeB = dayjs(b.started_at, 'HH:mm')


    return timeA.valueOf() - timeB.valueOf()
  }).slice(0, 4)

  // * 진짜 퇴실할껀지 한번더 물어보는 모달
  const handleCheckout = (item: CurrentUsageLog) => {
    setCheckoutItem(item)
  }

  const handleConfirmCheckout = () => {
    if (!checkoutItem) return
    checkoutMutate(checkoutItem.id)
    setCheckoutItem(null)

  }

  return (
    <>
      <Card
        title={
          <div className="flex min-w-0 items-center justify-between gap-2 ">
            <Space size={8} className="min-w-0">
              <ThunderboltOutlined className="text-orange-500!" />
              <span className="font-bold truncate">실시간 입실 유저</span>
              <Badge count={displayLists.length} showZero color="#f97316" className="ml-1!" />
            </Space>

            {isVerified && showViewAll && (
              <Link href="/usage">
                <Button type="link" size="small" className="px-0! text-orange-500!">
                  전체 보기
                </Button>
              </Link>
            )}
          </div>
        }
        className="w-full max-w-120 shadow-sm border-orange-100! overflow-y-auto!"
        styles={{ body: { padding: 12, minHeight: 200 } }}
      >
        <Spin spinning={loading} tip="데이터 갱신 중..." style={{marginTop: '60px'}}>
          {sortedData.length > 0 ? (
            <List
              dataSource={sortedData}
              renderItem={(item) => (
                <List.Item className="px-0! py-2!">
                  <CurrentLogItem item={item} onClick={setDetailItem} onCheckout={handleCheckout} />
                </List.Item>
              )}
            />
          ) : !loading && (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <Typography.Text type="secondary">
                  {!isVerified 
                    ? "매장 심사 완료 후 입실 현황을 확인할 수 있습니다." 
                    : "현재 입실 중인 유저가 없습니다."}
                </Typography.Text>
              }
            />
          )}
        </Spin>

        {showViewAll && (
          <div className="mt-3 border-t border-orange-100 pt-3">
            <Link href="/usage">
              <Button block className="border-orange-200! text-orange-500!">
                전체 보기
              </Button>
            </Link>
          </div>
        )}
      </Card>

      <ConfirmModal
        open={!!checkoutItem}
        title="퇴실 처리하시겠습니까?"
        description={
          checkoutItem
            ? `${checkoutItem.dog?.name}의 이용 상태를 퇴실로 변경합니다.`
            : ''
        }
        confirmText="퇴실 처리"
        cancelText="취소"
        confirmDanger
        onConfirm={handleConfirmCheckout}
        onCancel={() => setCheckoutItem(null)}
      />

      <CurrentLogDetailModal
        open={!!detailItem}
        item={detailItem}
        onClose={() => setDetailItem(null)}
        onCheckout={handleCheckout}
      />
    </>
  );
}