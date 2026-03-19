'use client'

import Link from 'next/link';
import {
  Card,
  Tag,
  Button,
  Space,
  Typography,
  Empty,
  Badge,
  List,
  Avatar,
} from 'antd';
import {
  ThunderboltOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { Dog } from 'lucide-react';
import { CurrentUser } from '@/widgets/owner/model/type';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';


dayjs.extend(customParseFormat);

export function RealtimeUsageTable({ data }: { data: CurrentUser[] }) {
  const showViewAll = data.length >= 4

  const sortedData = [...data].sort((a, b) => {
    const timeA = dayjs(a.startTime, 'HH:mm')
    const timeB = dayjs(b.startTime, 'HH:mm')
    console.log('time', timeA.valueOf())

    return timeA.valueOf() - timeB.valueOf()
  }).slice(0, 4)

  return (
    <Card
      title={
        <div className="flex min-w-0 items-center justify-between gap-2">
          <Space size={8} className="min-w-0">
            <ThunderboltOutlined className="text-orange-500!" />
            <span className="font-bold truncate">실시간 입실 유저</span>
            <Badge count={data.length} showZero color="#f97316" className="ml-1!" />
          </Space>

          {showViewAll && (
            <Link href="/usage">
              <Button type="link" size="small" className="px-0! text-orange-500!">
                전체 보기
              </Button>
            </Link>
          )}
        </div>
      }
      className="w-full max-w-120 shadow-sm border-orange-100!"
      bodyStyle={{ padding: 12 }}
    >
      {data.length > 0 ? (
        <List
          dataSource={sortedData}
          split={false}
          className="w-full"
          renderItem={(item) => (
            <List.Item className="px-0! py-2!">
              <div className="w-full rounded-xl border border-orange-100 bg-white px-3 py-3 transition-colors hover:bg-orange-50/60">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-3">
                      <Avatar
                        src={item.petImage}
                        size={48}
                        icon={<Dog size={20} className='text-orange-500'/>}
                        className="shrink-0 border border-orange-100 bg-orange-50!"
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex min-w-0 flex-wrap items-center gap-2">
                          <Typography.Text strong className="text-sm sm:text-base">
                            {item.petName}
                          </Typography.Text>

                          <Tag color="orange" className="text-[10px]! m-0!">
                            {item.type}
                          </Tag>
                        </div>

                        <div className="mt-1 flex min-w-0 flex-col gap-1">
                          <Typography.Text
                            type="secondary"
                            className="text-xs! truncate"
                          >
                            품종 : {item.breed}
                          </Typography.Text>

                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400">
                            <Space size={4}>
                              <ClockCircleOutlined className="text-[10px]" />
                              <span>{item.startTime} 입실</span>
                            </Space>

                            <span className="hidden sm:inline text-[10px]">|</span>

                            {/* //TODO 실시간으로 처리해야함 */}
                            <Typography.Text className="text-xs! text-blue-500! font-medium whitespace-nowrap">
                              {item.duration} 경과
                            </Typography.Text>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full sm:w-auto">
                    {/* //TODO 퇴실 처리로 등록되어야함 */}
                    <Button
                      size="middle"
                      danger
                      ghost
                      className="w-full sm:w-auto font-medium!"
                    >
                      퇴실 처리
                    </Button>
                  </div>
                </div>
              </div>
            </List.Item>
          )}
        />
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <Typography.Text type="secondary">
              현재 입실 중인 유저가 없습니다.
            </Typography.Text>
          }
        />
      )}

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
  );
}